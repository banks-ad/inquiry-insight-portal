
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

interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'pending';
  cycle: string;
}

const CommissionsTable: React.FC<CommissionsTableProps> = ({ type, cycle }) => {
  // Filter data based on type and cycle
  const filteredData = mockCommissionsData.filter(
    (item) => item.type === type && item.cycle === cycle
  );

  const handleDownloadCSV = () => {
    if (filteredData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    // Create CSV content
    const headers = ["Date", "Customer", "Provider", "Product", "Amount", "Status"];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.date,
        `"${row.customer}"`, // Wrap with quotes to handle commas in text
        `"${row.provider}"`,
        `"${row.product}"`,
        row.amount.toFixed(2),
        row.status
      ].join(','))
    ].join('\n');

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
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
                      {row.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default CommissionsTable;
