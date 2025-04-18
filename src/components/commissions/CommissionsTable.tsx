import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { CommissionsTableProps } from './types';
import { CommissionsTableHeaders } from './CommissionsTableHeaders';
import { CommissionsTableRow } from './CommissionsTableRow';
import { DownloadButton } from './DownloadButton';
import { FilterBar } from './FilterBar';
import { generateCSVHeaders, formatDataForCSV } from './utils';
import { mockCommissionsData, newAccountsData, lostAccountsData, accountVarianceData } from '@/data/mockData';

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
      
      const dataType = type === 'inquiries' ? 'disputes' : type;
      return item.type === dataType && matchesCycle && matchesSearch && matchesProvider && matchesType;
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

  const handleDownloadCSV = (format: string = 'standard') => {
    if (filteredData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    let headers: string[] = [];
    let filename = `${type}-${cycle}`;
    let values: string[][] = [];
    
    if (format === 'summary') {
      headers = ["Cycle", "Provider", "Total Net Billed", "Total Gross Commission", "Number of Accounts"];
      
      const providerSummary = filteredData.reduce((acc, row) => {
        const provider = row.provider;
        if (!acc[provider]) {
          acc[provider] = { 
            netBilled: 0, 
            grossCommission: 0,
            accountCount: 0
          };
        }
        acc[provider].netBilled += (row.netBilled || 0);
        acc[provider].grossCommission += row.amount;
        acc[provider].accountCount += 1;
        return acc;
      }, {} as Record<string, ProviderSummary>);
      
      values = Object.entries(providerSummary).map(([provider, data]) => [
        cycle,
        `"${provider}"`,
        data.netBilled.toFixed(2),
        data.grossCommission.toFixed(2),
        data.accountCount.toString()
      ]);
      
      filename = `commission-summary-${cycle}`;
    } else if (format === 'extended') {
      headers = [
        "Cycle", "Provider", "Product", "Account Number", "Customer", 
        "Net Billed", "Gross Commission", "Rate", "Type", "Status", 
        "Created Date", "Last Updated", "Order Number"
      ];
      
      values = filteredData.map(row => [
        row.cycle,
        `"${row.provider}"`,
        `"${row.product}"`,
        row.accountNumber || '',
        `"${row.customer}"`,
        (row.netBilled || 0).toFixed(2),
        row.amount.toFixed(2),
        row.rate || '',
        row.commissionType || type,
        row.status || 'Paid',
        row.inquiryDate || '2025-01-01',
        row.closedDate || '2025-01-15',
        row.orderNumber || ''
      ]);
      
      filename = `commissions-extended-${cycle}`;
    } else if (format === 'rpm') {
      headers = [
        "RPM ID", "Cycle", "Provider", "Account Number", "Customer", 
        "Net Billed", "Gross Commission", "Type", "Order Date"
      ];
      
      values = filteredData.map((row, index) => [
        `RPM-${cycle}-${index + 1000}`,
        row.cycle,
        `"${row.provider}"`,
        row.accountNumber || '',
        `"${row.customer}"`,
        (row.netBilled || 0).toFixed(2),
        row.amount.toFixed(2),
        row.commissionType || type,
        row.inquiryDate || '2025-01-01'
      ]);
      
      filename = `rpm-export-${cycle}`;
    } else {
      if (type === 'commissions' || type === 'spiffs') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
      } else if (type === 'inquiries') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", 
                   "Paid Commission", "Expected Commission", "Actual Commission", "Inquiry Status", 
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

      values = filteredData.map(row => {
        let rowValues: string[] = [];
        
        if (type === 'commissions' || type === 'spiffs') {
          rowValues = [
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
        } else if (type === 'inquiries') {
          rowValues = [
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
          rowValues = [
            `"${row.customer}"`,
            `"${row.provider}"`,
            `"${row.product}"`,
            row.orderNumber || '',
            row.status,
            row.activatedDate || '',
            row.expectedCommissionDate || ''
          ];
        } else if (type === 'adjustments') {
          rowValues = [
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
          rowValues = [
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
          rowValues = [
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
          rowValues = [
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
        
        return rowValues;
      });
    }

    const csvRows = values.map(row => row.join(','));
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${format.charAt(0).toUpperCase() + format.slice(1)} download started`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          type={type}
          uniqueProviders={uniqueProviders}
        />
        
        <div className="flex justify-end">
          <DownloadButton
            onDownload={handleDownloadCSV}
            disabled={filteredData.length === 0}
          />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <CommissionsTableHeaders type={type} isMobile={isMobile} />
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <CommissionsTableRow
                  key={row.id}
                  row={row}
                  type={type}
                  isMobile={isMobile}
                />
              ))
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

export default CommissionsTable;
