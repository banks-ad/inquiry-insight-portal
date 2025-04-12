
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { mockCommissionsData } from '@/data/mockData';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'pending';
  cycle: string;
}

const CommissionsTable: React.FC<CommissionsTableProps> = ({ type, cycle }) => {
  const isMobile = useIsMobile();
  
  // Filter data based on type and cycle
  const filteredData = mockCommissionsData.filter(
    (item) => item.type === type && item.cycle === cycle
  );

  const handleDownloadCSV = () => {
    if (filteredData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    // Create CSV content based on the type of table
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
      }
      
      return values.join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // Create a Blob and download link
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

  // Render different table structures based on the type
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
    }
  };

  return (
    <div className="space-y-4">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {renderTableHeaders()}
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => renderTableRow(row))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No data available for this selection
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper function to get status badge styles
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
