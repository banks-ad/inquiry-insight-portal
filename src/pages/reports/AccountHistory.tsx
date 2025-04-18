
import React, { useState } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search } from "lucide-react"
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { mockCommissionsData } from '@/data/mockCommissionsData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils';

const AccountHistory = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [filteredData, setFilteredData] = useState(mockCommissionsData);

  const handleSearch = () => {
    const filtered = mockCommissionsData.filter((item) => {
      const matchesAccount = !accountNumber || 
        item.accountNumber?.toLowerCase().includes(accountNumber.toLowerCase());
      
      const itemDate = item.cycle ? new Date(item.cycle + '-01') : null;
      const matchesDateRange = 
        (!dateRange.from || (itemDate && itemDate >= dateRange.from)) &&
        (!dateRange.to || (itemDate && itemDate <= dateRange.to));

      return matchesAccount && matchesDateRange;
    });

    setFilteredData(filtered);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Account History</h1>
          <p className="text-muted-foreground">View commission history by account number and date range</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 max-w-sm">
            <label className="text-sm font-medium mb-2 block">Account Number</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL yyyy")} -{" "}
                          {format(dateRange.to, "LLL yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL yyyy")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cycle</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Net Billed</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.cycle}</TableCell>
                  <TableCell>{row.accountNumber || 'N/A'}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="text-right">
                    {row.netBilled ? `$${row.netBilled.toFixed(2)}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
                  <TableCell>{row.rate || 'N/A'}</TableCell>
                  <TableCell>{row.type || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountHistory;
