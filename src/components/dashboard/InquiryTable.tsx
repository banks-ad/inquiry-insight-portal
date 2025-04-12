
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface Inquiry {
  id: string;
  client: string;
  agent: string;
  amount: number;
  date: string;
  status: 'open' | 'closed';
}

interface InquiryTableProps {
  inquiries: Inquiry[];
  title: string;
}

const InquiryTable: React.FC<InquiryTableProps> = ({ inquiries, title }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <button className="text-sm text-blue-600 hover:underline">
          View all
        </button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.client}</TableCell>
                <TableCell>{inquiry.agent}</TableCell>
                <TableCell>${inquiry.amount.toLocaleString()}</TableCell>
                <TableCell>{inquiry.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${
                      inquiry.status === 'open' 
                        ? 'bg-blue-50 text-commission-blue border-commission-blue' 
                        : 'bg-green-50 text-commission-green border-commission-green'
                    }`}
                  >
                    {inquiry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InquiryTable;
