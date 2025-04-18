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
import { Search, DollarSign, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Inquiry {
  id: string;
  requestor: string;
  submitDate: string;
  ticketNumber: string;
  subject: string;
  customer: string;
  provider: string;
  expectedCommission: number;
  status: 'Open' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  recoveredAmount?: number;
}

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

const InquiriesTable: React.FC<InquiriesTableProps> = ({ inquiries }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');

  const uniqueProviders = Array.from(new Set(inquiries.map(i => i.provider))).sort();
  const uniqueCustomers = Array.from(new Set(inquiries.map(i => i.customer))).sort();

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = searchQuery === '' || Object.values(inquiry).some(
      value => String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesProvider = selectedProvider === 'all' || inquiry.provider === selectedProvider;
    const matchesCustomer = selectedCustomer === 'all' || inquiry.customer === selectedCustomer;
    
    return matchesSearch && matchesProvider && matchesCustomer;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Commission Inquiries</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {uniqueProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                {uniqueCustomers.map((customer) => (
                  <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requestor</TableHead>
              <TableHead>Submit Date</TableHead>
              <TableHead>Ticket Number</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Expected Commission</TableHead>
              <TableHead>Recovered Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.requestor}</TableCell>
                  <TableCell>{inquiry.submitDate}</TableCell>
                  <TableCell>{inquiry.ticketNumber}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{inquiry.customer}</TableCell>
                  <TableCell>{inquiry.provider}</TableCell>
                  <TableCell>${inquiry.expectedCommission.toLocaleString()}</TableCell>
                  <TableCell>
                    {inquiry.status === 'Closed' ? (
                      <span className="flex items-center text-commission-green">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {(inquiry.recoveredAmount || inquiry.expectedCommission).toLocaleString()}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
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
                <TableCell colSpan={10} className="text-center py-4">
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
