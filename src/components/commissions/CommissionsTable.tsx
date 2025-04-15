import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Download, Search, Filter } from 'lucide-react';
import { 
  mockCommissionsData, 
  CommissionEntry, 
  newAccountsData, 
  lostAccountsData, 
  accountVarianceData 
} from '@/data/mockData';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'pending' | 'new-accounts' | 'lost-accounts' | 'account-variance';
  cycle: string;
}

const ITEMS_PER_PAGE = 10;

const CommissionsTable: React.FC<CommissionsTableProps> = ({ type, cycle }) => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Recurring', 'Non-recurring', 'SPIFF', 'Adjustment']);
  
  const uniqueProviders = Array.from(
    new Set(mockCommissionsData.map(item => item.provider))
  ).sort();

  const filteredData = React.useMemo(() => {
    let data;
    if (type === 'new-accounts') {
      data = [...newAccountsData];
    } else if (type === 'lost-accounts') {
      data = [...lostAccountsData];
    } else if (type === 'account-variance') {
      data = [...accountVarianceData];
    } else {
      data = [...mockCommissionsData];
    }
    
    return data.filter((item) => {
      const matchesCycle = item.cycle === cycle;
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(
          value => 
            typeof value === 'string' && 
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesProvider = selectedProvider === 'all' || item.provider === selectedProvider;
      const matchesType = type === 'commissions' ? selectedTypes.includes(item.commissionType || '') : true;
      
      if (type === 'new-accounts' || type === 'lost-accounts' || type === 'account-variance') {
        return matchesCycle && matchesSearch && matchesProvider;
      }
      
      return item.type === type && matchesCycle && matchesSearch && matchesProvider && matchesType;
    });
  }, [type, cycle, searchTerm, selectedProvider, selectedTypes]);

  const totalNetBilled = filteredData.reduce((sum, item) => sum + (item.netBilled || 0), 0);
  const totalGrossCommission = filteredData.reduce((sum, item) => sum + item.amount, 0);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProvider, type, cycle]);

  const handleDownloadCSV = () => {
    if (filteredData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    let headers: string[] = [];
    
    if (type === 'commissions' || type === 'spiffs') {
      headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
    } else if (type === 'disputes') {
      headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", 
                 "Paid Commission", "Expected Commission", "Actual Commission", "Dispute Status", 
                 "Ticket Number", "Inquiry Date", "Closed Date"];
    } else if (type === 'pending') {
      headers = ["Customer", "Provider", "Product", "Order Number", "Status", 
                 "Activated Date", "Expected Commission Date"];
    } else if (type === 'adjustments') {
      headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Amount", "Adjustment Type", "Status"];
    } else if (type === 'new-accounts') {
      headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
    } else if (type === 'lost-accounts') {
      headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
    } else if (type === 'account-variance') {
      headers = ["Current Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type", "Variance vs. Last Month", "Variance vs. 2 Months Ago", "Variance vs. 3 Months Ago"];
    }

    const csvRows = filteredData.map(row => {
      let values: string[] = [];
      
      if (type === 'commissions' || type === 'spiffs') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          (row.netBilled || 0).toFixed(2),
          row.amount.toFixed(2),
          row.rate || '',
          row.commissionType || type
        ];
      } else if (type === 'disputes') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          (row.netBilled || 0).toFixed(2),
          (row.paidCommission || 0).toFixed(2),
          (row.expectedCommission || 0).toFixed(2),
          row.amount.toFixed(2),
          row.status,
          row.ticketNumber || '',
          row.inquiryDate || '',
          row.closedDate || ''
        ];
      } else if (type === 'pending') {
        values = [
          `"${row.customer}"`,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.orderNumber || '',
          row.status,
          row.activatedDate || '',
          row.expectedCommissionDate || ''
        ];
      } else if (type === 'adjustments') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          row.amount.toFixed(2),
          row.adjustmentType || 'Manual',
          row.status
        ];
      } else if (type === 'new-accounts') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          (row.netBilled || 0).toFixed(2),
          row.amount.toFixed(2),
          row.rate || '',
          row.commissionType || type
        ];
      } else if (type === 'lost-accounts') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          (row.netBilled || 0).toFixed(2),
          row.amount.toFixed(2),
          row.rate || '',
          row.commissionType || type
        ];
      } else if (type === 'account-variance') {
        values = [
          row.cycle,
          `"${row.provider}"`,
          `"${row.product}"`,
          row.accountNumber || '',
          `"${row.customer}"`,
          (row.netBilled || 0).toFixed(2),
          row.amount.toFixed(2),
          row.rate || '',
          row.commissionType || type,
          row.varianceLastMonth.toFixed(2),
          row.varianceTwoMonths.toFixed(2),
          row.varianceThreeMonths.toFixed(2)
        ];
      }
      
      return values.join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}-${cycle}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started");
  };

  const renderTableHeaders = () => {
    if (type === 'commissions' || type === 'spiffs') {
      return (
        <TableRow>
          <TableHead>Cycle</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Product</TableHead>
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
          <TableHead className="text-right">Gross Commission</TableHead>
          {!isMobile && <TableHead>Rate</TableHead>}
          {!isMobile && <TableHead>Type</TableHead>}
        </TableRow>
      );
    } else if (type === 'disputes') {
      return (
        <TableRow>
          <TableHead>Cycle</TableHead>
          <TableHead>Provider</TableHead>
          {!isMobile && <TableHead>Product</TableHead>}
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
          {!isMobile && <TableHead className="text-right">Paid Commission</TableHead>}
          <TableHead className="text-right">Expected Commission</TableHead>
          <TableHead className="text-right">Actual Commission</TableHead>
          <TableHead>Dispute Status</TableHead>
          {!isMobile && <TableHead>Ticket Number</TableHead>}
          {!isMobile && <TableHead>Inquiry Date</TableHead>}
          {!isMobile && <TableHead>Closed Date</TableHead>}
        </TableRow>
      );
    } else if (type === 'pending') {
      return (
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Provider</TableHead>
          {!isMobile && <TableHead>Product</TableHead>}
          {!isMobile && <TableHead>Order Number</TableHead>}
          <TableHead>Status</TableHead>
          {!isMobile && <TableHead>Activated Date</TableHead>}
          <TableHead>Expected Commission Date</TableHead>
        </TableRow>
      );
    } else if (type === 'adjustments') {
      return (
        <TableRow>
          <TableHead>Cycle</TableHead>
          <TableHead>Provider</TableHead>
          {!isMobile && <TableHead>Product</TableHead>}
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {!isMobile && <TableHead>Adjustment Type</TableHead>}
          <TableHead>Status</TableHead>
        </TableRow>
      );
    } else if (type === 'new-accounts') {
      return (
        <TableRow>
          <TableHead>Cycle</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Product</TableHead>
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
          <TableHead className="text-right">Gross Commission</TableHead>
          {!isMobile && <TableHead>Rate</TableHead>}
          {!isMobile && <TableHead>Type</TableHead>}
        </TableRow>
      );
    } else if (type === 'lost-accounts') {
      return (
        <TableRow>
          <TableHead>Cycle</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Product</TableHead>
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
          <TableHead className="text-right">Gross Commission</TableHead>
          {!isMobile && <TableHead>Rate</TableHead>}
          {!isMobile && <TableHead>Type</TableHead>}
        </TableRow>
      );
    } else if (type === 'account-variance') {
      return (
        <TableRow>
          <TableHead>Current Cycle</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Product</TableHead>
          {!isMobile && <TableHead>Account Number</TableHead>}
          <TableHead>Customer</TableHead>
          {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
          <TableHead className="text-right">Gross Commission</TableHead>
          {!isMobile && <TableHead>Rate</TableHead>}
          {!isMobile && <TableHead>Type</TableHead>}
          <TableHead className="text-right">Variance vs. Last Month</TableHead>
          {!isMobile && <TableHead className="text-right">Variance vs. 2 Months Ago</TableHead>}
          {!isMobile && <TableHead className="text-right">Variance vs. 3 Months Ago</TableHead>}
        </TableRow>
      );
    }
  };

  const renderTableRow = (row: any) => {
    if (type === 'commissions' || type === 'spiffs') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          <TableCell>{row.product}</TableCell>
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
          <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
          {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.commissionType || type}</TableCell>}
        </TableRow>
      );
    } else if (type === 'disputes') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          {!isMobile && <TableCell>{row.product}</TableCell>}
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
          {!isMobile && <TableCell className="text-right">${(row.paidCommission || 0).toFixed(2)}</TableCell>}
          <TableCell className="text-right">${(row.expectedCommission || 0).toFixed(2)}</TableCell>
          <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
          <TableCell>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
              {row.status}
            </div>
          </TableCell>
          {!isMobile && <TableCell>{row.ticketNumber || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.inquiryDate || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.closedDate || 'N/A'}</TableCell>}
        </TableRow>
      );
    } else if (type === 'pending') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.customer}</TableCell>
          <TableCell>{row.provider}</TableCell>
          {!isMobile && <TableCell>{row.product}</TableCell>}
          {!isMobile && <TableCell>{row.orderNumber || 'N/A'}</TableCell>}
          <TableCell>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
              {row.status}
            </div>
          </TableCell>
          {!isMobile && <TableCell>{row.activatedDate || 'N/A'}</TableCell>}
          <TableCell>{row.expectedCommissionDate || 'N/A'}</TableCell>
        </TableRow>
      );
    } else if (type === 'adjustments') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          {!isMobile && <TableCell>{row.product}</TableCell>}
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          <TableCell className={`text-right ${row.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${row.amount.toFixed(2)}
          </TableCell>
          {!isMobile && <TableCell>{row.adjustmentType || 'Manual'}</TableCell>}
          <TableCell>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
              {row.status}
            </div>
          </TableCell>
        </TableRow>
      );
    } else if (type === 'new-accounts') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          <TableCell>{row.product}</TableCell>
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
          <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
          {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.commissionType || type}</TableCell>}
        </TableRow>
      );
    } else if (type === 'lost-accounts') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          <TableCell>{row.product}</TableCell>
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
          <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
          {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.commissionType || type}</TableCell>}
        </TableRow>
      );
    } else if (type === 'account-variance') {
      return (
        <TableRow key={row.id}>
          <TableCell>{row.cycle}</TableCell>
          <TableCell>{row.provider}</TableCell>
          <TableCell>{row.product}</TableCell>
          {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
          <TableCell>{row.customer}</TableCell>
          {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
          <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
          {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
          {!isMobile && <TableCell>{row.type}</TableCell>}
          <TableCell className={`text-right ${row.varianceLastMonth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${row.varianceLastMonth.toFixed(2)}
          </TableCell>
          {!isMobile && (
            <TableCell className={`text-right ${row.varianceTwoMonths >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${row.varianceTwoMonths.toFixed(2)}
            </TableCell>
          )}
          {!isMobile && (
            <TableCell className={`text-right ${row.varianceThreeMonths >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${row.varianceThreeMonths.toFixed(2)}
            </TableCell>
          )}
        </TableRow>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:w-2/3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="w-full sm:w-64">
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {uniqueProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === 'commissions' && (
            <div className="flex flex-wrap gap-2">
              {['Recurring', 'Non-recurring', 'SPIFF', 'Adjustment'].map((commType) => (
                <Button
                  key={commType}
                  variant={selectedTypes.includes(commType) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTypes(prev => 
                      prev.includes(commType)
                        ? prev.filter(t => t !== commType)
                        : [...prev, commType]
                    );
                  }}
                >
                  {commType}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadCSV}
            disabled={filteredData.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {renderTableHeaders()}
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => renderTableRow(row))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No data available for this selection
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {(type === 'commissions' || type === 'spiffs') && filteredData.length > 0 && (
            <TableFooter className="bg-muted/50">
              <TableRow>
                <TableCell colSpan={isMobile ? 3 : 5} className="font-medium">
                  Totals
                </TableCell>
                {!isMobile && (
                  <TableCell className="text-right font-medium">
                    ${totalNetBilled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                )}
                <TableCell className="text-right font-medium">
                  ${totalGrossCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                {!isMobile && <TableCell colSpan={2}></TableCell>}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber: number;
              
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === currentPage}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

function getStatusStyles(status: string): string {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Disputed':
      return 'bg-red-100 text-red-800';
    case 'Approved':
      return 'bg-blue-100 text-blue-800';
    case 'Adjusted':
      return 'bg-purple-100 text-purple-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    case 'Provisioning':
      return 'bg-indigo-100 text-indigo-800';
    case 'Submitted':
      return 'bg-amber-100 text-amber-800';
    case 'Open':
      return 'bg-orange-100 text-orange-800';
    case 'Closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default CommissionsTable;
