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
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, ChevronDown } from 'lucide-react';

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

  const handleDownloadCSV = (format: string = 'standard') => {
    if (filteredInquiries.length === 0) {
      toast.error("No data available to download");
      return;
    }

    let headers: string[];
    let filename = 'commission-inquiries';
    
    if (format === 'summary') {
      headers = [
        "Provider",
        "Total Expected Commission",
        "Total Recovered Amount",
        "Number of Inquiries",
        "Open Inquiries",
        "Closed Inquiries"
      ];

      const providerSummary = filteredInquiries.reduce((acc, inquiry) => {
        const provider = inquiry.provider;
        if (!acc[provider]) {
          acc[provider] = {
            expectedCommission: 0,
            recoveredAmount: 0,
            totalInquiries: 0,
            openInquiries: 0,
            closedInquiries: 0
          };
        }
        acc[provider].expectedCommission += inquiry.expectedCommission;
        acc[provider].recoveredAmount += inquiry.status === 'Closed' ? (inquiry.recoveredAmount || inquiry.expectedCommission) : 0;
        acc[provider].totalInquiries += 1;
        acc[provider].openInquiries += inquiry.status === 'Open' ? 1 : 0;
        acc[provider].closedInquiries += inquiry.status === 'Closed' ? 1 : 0;
        return acc;
      }, {} as Record<string, any>);

      const values = Object.entries(providerSummary).map(([provider, data]) => [
        provider,
        data.expectedCommission.toFixed(2),
        data.recoveredAmount.toFixed(2),
        data.totalInquiries.toString(),
        data.openInquiries.toString(),
        data.closedInquiries.toString()
      ]);

      filename = 'commission-inquiries-summary';
      const csvContent = [headers.join(','), ...values.map(row => row.join(','))].join('\n');
      downloadCSV(csvContent, filename);
    } else {
      headers = [
        "Requestor",
        "Submit Date",
        "Ticket Number",
        "Subject",
        "Customer",
        "Provider",
        "Expected Commission",
        "Recovered Amount",
        "Status",
        "Priority"
      ];

      const values = filteredInquiries.map(inquiry => [
        inquiry.requestor,
        inquiry.submitDate,
        inquiry.ticketNumber,
        `"${inquiry.subject}"`,
        `"${inquiry.customer}"`,
        `"${inquiry.provider}"`,
        inquiry.expectedCommission.toFixed(2),
        inquiry.status === 'Closed' ? (inquiry.recoveredAmount || inquiry.expectedCommission).toFixed(2) : '',
        inquiry.status,
        inquiry.priority
      ]);

      filename = 'commission-inquiries-detailed';
      const csvContent = [headers.join(','), ...values.map(row => row.join(','))].join('\n');
      downloadCSV(csvContent, filename);
    }
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started");
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={filteredInquiries.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDownloadCSV('summary')}>
                  Summary Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadCSV('standard')}>
                  Detailed Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
