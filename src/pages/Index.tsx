
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import CommissionChart from '@/components/dashboard/CommissionChart';
import TopProvidersChart from '@/components/dashboard/TopProvidersChart';
import { 
  DollarSign, 
  CreditCard
} from 'lucide-react';
import { commissionChartData, topProvidersData } from '@/data/mockData';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Commission Dashboard</h1>
          <p className="text-muted-foreground">Overview of your commission metrics and inquiries</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <StatCard 
            title="Net Billed" 
            value="$249,000" 
            description="87.4% of gross" 
            icon={CreditCard}
            trend={5.7}
            colorClass="bg-green-50 text-commission-green"
          />
          
          <StatCard 
            title="Gross Commission" 
            value="$285,000" 
            description="Total commissions YTD" 
            icon={DollarSign}
            trend={8.2}
            colorClass="bg-blue-50 text-commission-blue"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Commission Chart */}
          <CommissionChart data={commissionChartData} />
          
          {/* Top Providers Chart */}
          <TopProvidersChart data={topProvidersData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
