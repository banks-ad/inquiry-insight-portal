
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Inquiry } from '@/components/dashboard/InquiryTable';

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

const InquiriesTable: React.FC<InquiriesTableProps> = ({ inquiries }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      inquiry.client.toLowerCase().includes(searchStr) ||
      inquiry.agent.toLowerCase().includes(searchStr) ||
      inquiry.amount.toString().includes(searchStr) ||
      inquiry.date.toLowerCase().includes(searchStr) ||
      inquiry.status.toLowerCase().includes(searchStr)
    );
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Commission Inquiries</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
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
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
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
                  {searchQuery ? 'No matching inquiries found' : 'No inquiries found'}
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
