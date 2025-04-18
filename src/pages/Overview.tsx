import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import CommissionChart from '@/components/dashboard/CommissionChart';
import TopProvidersChart from '@/components/dashboard/TopProvidersChart';
import TopCustomersChart from '@/components/dashboard/TopCustomersChart';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  CreditCard,
  Eye
} from 'lucide-react';
import { commissionChartData, topProvidersData, topCustomersData } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Commission Overview</h1>
            <p className="text-muted-foreground">Overview of your commission metrics and inquiries</p>
          </div>
          <Button 
            onClick={() => navigate('/commissions')}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview Commissions
          </Button>
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
        
        {/* Commission Chart - Full Width */}
        <div className="mb-8">
          <CommissionChart data={commissionChartData} />
        </div>
        
        {/* Top Providers and Top Customers Charts - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Providers Chart */}
          <TopProvidersChart data={topProvidersData} />
          
          {/* Top Customers Chart */}
          <TopCustomersChart data={topCustomersData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
