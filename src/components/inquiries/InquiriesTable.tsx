
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
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Inquiry } from '@/components/dashboard/InquiryTable';

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

const InquiriesTable: React.FC<InquiriesTableProps> = ({ inquiries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
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
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No inquiries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InquiriesTable;
