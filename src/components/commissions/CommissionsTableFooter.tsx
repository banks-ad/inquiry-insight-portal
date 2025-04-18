
import React from 'react';
import { TableCell, TableFooter, TableRow } from '@/components/ui/table';

interface CommissionsTableFooterProps {
  type: string;
  totalNetBilled: number;
  totalGrossCommission: number;
  isMobile: boolean;
  showTotals: boolean;
}

export const CommissionsTableFooter: React.FC<CommissionsTableFooterProps> = ({
  type,
  totalNetBilled,
  totalGrossCommission,
  isMobile,
  showTotals
}) => {
  if (!showTotals || (type !== 'commissions' && type !== 'spiffs')) {
    return null;
  }

  return (
    <TableFooter className="bg-muted/50">
      <TableRow>
        <TableCell colSpan={isMobile ? 3 : 5} className="font-medium">
          Totals
        </TableCell>
        {!isMobile && (
          <TableCell className="text-right font-medium">
            ${totalNetBilled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </TableCell>
        )}
        <TableCell className="text-right font-medium">
          ${totalGrossCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </TableCell>
        {!isMobile && <TableCell colSpan={2}></TableCell>}
      </TableRow>
    </TableFooter>
  );
};

