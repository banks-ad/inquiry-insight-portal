
import React, { useState } from 'react';
import { Search } from "lucide-react"
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockCommissionsData } from '@/data/mockCommissionsData';
import { DownloadButton } from '@/components/commissions/DownloadButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AccountHistory = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [filteredData, setFilteredData] = useState<typeof mockCommissionsData>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const filtered = mockCommissionsData.filter((item) => {
      return !accountNumber || 
        item.accountNumber?.toLowerCase().includes(accountNumber.toLowerCase());
    });

    setFilteredData(filtered);
    setHasSearched(true);
  };

  const handleDownload = (type: string) => {
    // In a real application, this would trigger the actual download
    console.log('Downloading account history:', type, 'for account:', accountNumber);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Account History</h1>
          <p className="text-muted-foreground">View commission history by account number</p>
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

          <div className="flex items-end gap-2">
            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <DownloadButton 
              onDownload={handleDownload} 
              disabled={!hasSearched || filteredData.length === 0}
            />
          </div>
        </div>

        {!hasSearched ? (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
            <p className="text-lg text-muted-foreground">
              Enter an account number above to view the complete commission history for that account.
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
            <p className="text-lg text-muted-foreground">
              No results found for the specified account number.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default AccountHistory;
