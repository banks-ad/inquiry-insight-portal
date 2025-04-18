
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { TableRowProps } from './types';
import { getStatusStyles } from './utils';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';

export const CommissionsTableRow: React.FC<TableRowProps> = ({ row, type, isMobile }) => {
  const handleCreateInquiry = () => {
    toast.info("Create inquiry functionality coming soon");
  };

  if (type === 'commissions' || type === 'spiffs') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.product}</TableCell>
        {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
        <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
        {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
        {!isMobile && <TableCell>{row.commissionType || type}</TableCell>}
        <TableCell className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateInquiry}
          >
            <FilePlus className="h-4 w-4 mr-1" />
            Create Inquiry
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  if (type === 'pending') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.product}</TableCell>
        {!isMobile && <TableCell>{row.orderNumber || 'N/A'}</TableCell>}
        <TableCell>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
            {row.status}
          </div>
        </TableCell>
        {!isMobile && <TableCell>{row.activatedDate || 'N/A'}</TableCell>}
        <TableCell>{row.expectedCommissionDate || 'N/A'}</TableCell>
      </TableRow>
    );
  }

  if (type === 'inquiries') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        {!isMobile && <TableCell>{row.product}</TableCell>}
        {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
        {!isMobile && <TableCell className="text-right">${(row.paidCommission || 0).toFixed(2)}</TableCell>}
        <TableCell className="text-right">${(row.expectedCommission || 0).toFixed(2)}</TableCell>
        <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
        <TableCell>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(row.status)}`}>
            {row.status}
          </div>
        </TableCell>
        {!isMobile && <TableCell>{row.ticketNumber || 'N/A'}</TableCell>}
        {!isMobile && <TableCell>{row.inquiryDate || 'N/A'}</TableCell>}
        {!isMobile && <TableCell>{row.closedDate || 'N/A'}</TableCell>}
      </TableRow>
    );
  }

  if (type === 'new-accounts') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.product}</TableCell>
        {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
        <TableCell className="text-right">${(row.amount || 0).toFixed(2)}</TableCell>
        {!isMobile && <TableCell>{row.rate || 'N/A'}</TableCell>}
        {!isMobile && <TableCell>{row.activatedDate || 'N/A'}</TableCell>}
      </TableRow>
    );
  }

  if (type === 'lost-accounts') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.product}</TableCell>
        {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${(row.netBilled || 0).toFixed(2)}</TableCell>}
        <TableCell className="text-right">${(row.amount || 0).toFixed(2)}</TableCell>
        {!isMobile && <TableCell>{row.lastCommission || 'N/A'}</TableCell>}
      </TableRow>
    );
  }

  if (type === 'account-variance') {
    // Add null checks for firstCycleAmount and secondCycleAmount
    const firstCycleAmount = row.firstCycleAmount || 0;
    const secondCycleAmount = row.secondCycleAmount || 0;
    
    // Calculate variance with null check
    const variance = firstCycleAmount === 0 
      ? 0 
      : ((secondCycleAmount - firstCycleAmount) / firstCycleAmount) * 100;
    
    return (
      <TableRow key={row.id}>
        <TableCell>{row.provider}</TableCell>
        {!isMobile && <TableCell>{row.product || 'N/A'}</TableCell>}
        {!isMobile && <TableCell>{row.accountNumber || 'N/A'}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        <TableCell className="text-right">${firstCycleAmount.toFixed(2)}</TableCell>
        <TableCell className="text-right">${secondCycleAmount.toFixed(2)}</TableCell>
        <TableCell className={`text-right ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {variance >= 0 ? '+' : ''}{variance.toFixed(2)}%
        </TableCell>
      </TableRow>
    );
  }

  return null;
};
