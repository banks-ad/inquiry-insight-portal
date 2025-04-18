
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Commission Overview</h1>
          <p className="text-muted-foreground">Overview of your commissions</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
