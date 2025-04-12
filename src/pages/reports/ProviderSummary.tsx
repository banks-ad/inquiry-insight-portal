
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProviderSummaryTable from '@/components/reports/ProviderSummaryTable';
import { mockProviderSummaryData } from '@/data/mockProviderSummaryData';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

const ProviderSummaryPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Summary by Provider</h1>
            <p className="text-muted-foreground">Six-month summary of gross commissions by provider</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer size={16} />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <ProviderSummaryTable data={mockProviderSummaryData} />
      </div>
    </DashboardLayout>
  );
};

export default ProviderSummaryPage;
