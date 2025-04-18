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
        {!isMobile && <TableCell>{row.accountNumber}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${row.netBilled.toFixed(2)}</TableCell>}
        <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
        {!isMobile && <TableCell>{row.rate}</TableCell>}
        {!isMobile && <TableCell>{row.activatedDate}</TableCell>}
      </TableRow>
    );
  }

  if (type === 'lost-accounts') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        <TableCell>{row.product}</TableCell>
        {!isMobile && <TableCell>{row.accountNumber}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        {!isMobile && <TableCell className="text-right">${row.netBilled.toFixed(2)}</TableCell>}
        <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
        {!isMobile && <TableCell>{row.lastCommission}</TableCell>}
      </TableRow>
    );
  }

  if (type === 'account-variance') {
    return (
      <TableRow key={row.id}>
        <TableCell>{row.cycle}</TableCell>
        <TableCell>{row.provider}</TableCell>
        {!isMobile && <TableCell>{row.product}</TableCell>}
        {!isMobile && <TableCell>{row.accountNumber}</TableCell>}
        <TableCell>{row.customer}</TableCell>
        <TableCell className="text-right">${row.netBilled.toFixed(2)}</TableCell>
        <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
        <TableCell className={`text-right ${row.varianceLastMonth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {row.varianceLastMonth >= 0 ? '+' : ''}{row.varianceLastMonth.toFixed(2)}%
        </TableCell>
        {!isMobile && (
          <TableCell className={`text-right ${row.varianceTwoMonths >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {row.varianceTwoMonths >= 0 ? '+' : ''}{row.varianceTwoMonths.toFixed(2)}%
          </TableCell>
        )}
        {!isMobile && (
          <TableCell className={`text-right ${row.varianceThreeMonths >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {row.varianceThreeMonths >= 0 ? '+' : ''}{row.varianceThreeMonths.toFixed(2)}%
          </TableCell>
        )}
      </TableRow>
    );
  }

  return null;
};
