
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockCommissionsData } from '@/data/mockData';

interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'disputes' | 'pending';
  cycle: string;
}

const CommissionsTable: React.FC<CommissionsTableProps> = ({ type, cycle }) => {
  // Filter data based on type and cycle
  const filteredData = mockCommissionsData.filter(
    (item) => item.type === type && item.cycle === cycle
  );

  return (
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
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default CommissionsTable;
