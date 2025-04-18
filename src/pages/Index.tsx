
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome to CommissionIQ</h1>
          <p className="text-muted-foreground">Select a section from the navigation to get started</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
