
import React from 'react';
import { TableHead, TableRow } from '@/components/ui/table';
import { TableHeadersProps } from './types';

export const CommissionsTableHeaders: React.FC<TableHeadersProps> = ({ type, isMobile, cyclePair }) => {
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

  if (type === 'pending') {
    return (
      <TableRow>
        <TableHead>Customer</TableHead>
        <TableHead>Provider</TableHead>
        <TableHead>Product</TableHead>
        {!isMobile && <TableHead>Order Number</TableHead>}
        <TableHead>Status</TableHead>
        {!isMobile && <TableHead>Activated Date</TableHead>}
        <TableHead>Expected Commission Date</TableHead>
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

  if (type === 'new-accounts') {
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
        {!isMobile && <TableHead>Activation Date</TableHead>}
      </TableRow>
    );
  }

  if (type === 'lost-accounts') {
    return (
      <TableRow>
        <TableHead>Cycle</TableHead>
        <TableHead>Provider</TableHead>
        <TableHead>Product</TableHead>
        {!isMobile && <TableHead>Account Number</TableHead>}
        <TableHead>Customer</TableHead>
        {!isMobile && <TableHead className="text-right">Last Net Billed</TableHead>}
        <TableHead className="text-right">Last Commission</TableHead>
        {!isMobile && <TableHead>Last Active Date</TableHead>}
      </TableRow>
    );
  }

  if (type === 'account-variance') {
    return (
      <TableRow>
        <TableHead>Provider</TableHead>
        {!isMobile && <TableHead>Product</TableHead>}
        {!isMobile && <TableHead>Account Number</TableHead>}
        <TableHead>Customer</TableHead>
        <TableHead className="text-right">{cyclePair?.firstCycle || 'First Cycle'}</TableHead>
        <TableHead className="text-right">{cyclePair?.secondCycle || 'Second Cycle'}</TableHead>
        <TableHead className="text-right">Variance %</TableHead>
      </TableRow>
    );
  }

  return null;
};
