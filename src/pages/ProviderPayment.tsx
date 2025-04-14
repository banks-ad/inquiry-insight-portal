
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProviderPaymentTable from '@/components/provider/ProviderPaymentTable';
import { mockProviderPaymentData } from '@/data/mockProviderPaymentData';

const ProviderPayment = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Provider Payment</h1>
          <p className="text-muted-foreground">Track and manage provider payments</p>
        </div>
        <ProviderPaymentTable data={mockProviderPaymentData} />
      </div>
    </DashboardLayout>
  );
};

export default ProviderPayment;
