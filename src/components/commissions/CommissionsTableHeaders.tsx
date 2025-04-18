import React from 'react';
import { TableHead, TableRow } from '@/components/ui/table';
import { TableHeadersProps } from './types';

export const CommissionsTableHeaders: React.FC<TableHeadersProps> = ({ type, isMobile }) => {
  if (type === 'commissions' || type === 'spiffs') {
    return (
      <TableRow>
        <TableHead>Cycle</TableHead>
        <TableHead>Provider</TableHead>
        <TableHead>Product</TableHead>
        {!isMobile && <TableHead>Account Number</TableHead>}
        <TableHead>Customer</TableHead>
        {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
        <TableHead className="text-right">Gross Commission</TableHead>
        {!isMobile && <TableHead>Rate</TableHead>}
        {!isMobile && <TableHead>Type</TableHead>}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    );
  }

  if (type === 'inquiries') {
    return (
      <TableRow>
        <TableHead>Cycle</TableHead>
        <TableHead>Provider</TableHead>
        {!isMobile && <TableHead>Product</TableHead>}
        {!isMobile && <TableHead>Account Number</TableHead>}
        <TableHead>Customer</TableHead>
        {!isMobile && <TableHead className="text-right">Net Billed</TableHead>}
        {!isMobile && <TableHead className="text-right">Paid Commission</TableHead>}
        <TableHead className="text-right">Expected Commission</TableHead>
        <TableHead className="text-right">Actual Commission</TableHead>
        <TableHead>Inquiry Status</TableHead>
        {!isMobile && <TableHead>Ticket Number</TableHead>}
        {!isMobile && <TableHead>Inquiry Date</TableHead>}
        {!isMobile && <TableHead>Closed Date</TableHead>}
      </TableRow>
    );
  }

  return null;
};
