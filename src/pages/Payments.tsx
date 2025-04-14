
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PaymentsTable from '@/components/payments/PaymentsTable';
import { mockPaymentsData } from '@/data/mockPaymentsData';

const Payments = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track and manage your payments</p>
        </div>
        <PaymentsTable data={mockPaymentsData} />
      </div>
    </DashboardLayout>
  );
};

export default Payments;
