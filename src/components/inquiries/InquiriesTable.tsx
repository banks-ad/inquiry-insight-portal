
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

interface Inquiry {
  id: string;
  requestor: string;
  ticketNumber: string;
  subject: string;
  customer: string;
  provider: string;
  expectedCommission: number;
  status: 'Open' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
}

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

const InquiriesTable: React.FC<InquiriesTableProps> = ({ inquiries }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      inquiry.requestor.toLowerCase().includes(searchStr) ||
      inquiry.ticketNumber.toLowerCase().includes(searchStr) ||
      inquiry.subject.toLowerCase().includes(searchStr) ||
      inquiry.customer.toLowerCase().includes(searchStr) ||
      inquiry.provider.toLowerCase().includes(searchStr) ||
      inquiry.status.toLowerCase().includes(searchStr) ||
      inquiry.priority.toLowerCase().includes(searchStr)
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
              <TableHead>Requestor</TableHead>
              <TableHead>Ticket Number</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Expected Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.requestor}</TableCell>
                  <TableCell>{inquiry.ticketNumber}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{inquiry.customer}</TableCell>
                  <TableCell>{inquiry.provider}</TableCell>
                  <TableCell>${inquiry.expectedCommission.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${
                        inquiry.status === 'Open' 
                          ? 'bg-blue-50 text-commission-blue border-commission-blue' 
                          : 'bg-green-50 text-commission-green border-commission-green'
                      }`}
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${
                        inquiry.priority === 'High'
                          ? 'bg-red-50 text-red-600 border-red-600'
                          : inquiry.priority === 'Medium'
                          ? 'bg-yellow-50 text-yellow-600 border-yellow-600'
                          : 'bg-green-50 text-green-600 border-green-600'
                      }`}
                    >
                      {inquiry.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
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
