
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { TableRowProps } from './types';
import { getStatusStyles } from './utils';

export const CommissionsTableRow: React.FC<TableRowProps> = ({ row, type, isMobile }) => {
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
        <TableCell className="text-right">${(row.expectedCommission || 0).toFixed(2)}</TableCell>}
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

  // ... add other row configurations for different types
  return null;
};
