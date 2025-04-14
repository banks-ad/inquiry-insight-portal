
import React from 'react';
import { Check, Clock, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Payment } from '@/data/mockPaymentsData';

interface PaymentsTableProps {
  data: Payment[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ data }) => {
  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'Complete':
        return <Check className="text-green-500" />;
      case 'Pending':
        return <Clock className="text-yellow-500" />;
      case 'Failed':
        return <X className="text-red-500" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Net Receivable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(payment.status)}
                  {payment.status}
                </div>
              </TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell className="text-right">
                ${payment.netReceivable.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
