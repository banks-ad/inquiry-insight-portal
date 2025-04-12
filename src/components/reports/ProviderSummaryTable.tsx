
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ProviderSummary, summaryMonths } from '@/data/mockProviderSummaryData';

interface ProviderSummaryTableProps {
  data: ProviderSummary[];
}

const ProviderSummaryTable: React.FC<ProviderSummaryTableProps> = ({ data }) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format month name for display (e.g., "2025-04" to "Apr 2025")
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  // Calculate grand totals for each month and overall
  const grandTotals = summaryMonths.reduce((acc, month) => {
    acc[month] = data.reduce((sum, provider) => sum + provider.months[month], 0);
    return acc;
  }, {} as { [key: string]: number });

  const grandTotal = data.reduce((sum, provider) => sum + provider.totalCommission, 0);

  return (
    <Card className="w-full">
      <ScrollArea className="h-[calc(100vh-280px)] w-full">
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px] sticky left-0 bg-background">Provider</TableHead>
                {summaryMonths.map(month => (
                  <TableHead key={month} className="text-right min-w-[140px]">
                    {formatMonth(month)}
                  </TableHead>
                ))}
                <TableHead className="text-right min-w-[140px] font-bold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium sticky left-0 bg-background">{provider.provider}</TableCell>
                  {summaryMonths.map(month => (
                    <TableCell key={month} className="text-right">
                      {formatCurrency(provider.months[month])}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-bold">
                    {formatCurrency(provider.totalCommission)}
                  </TableCell>
                </TableRow>
              ))}
              {/* Grand total row */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell className="sticky left-0 bg-muted/50">Grand Total</TableCell>
                {summaryMonths.map(month => (
                  <TableCell key={month} className="text-right">
                    {formatCurrency(grandTotals[month])}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  {formatCurrency(grandTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ProviderSummaryTable;
