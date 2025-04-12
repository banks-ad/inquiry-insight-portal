
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import InquiryTable from '@/components/dashboard/InquiryTable';
import CommissionChart from '@/components/dashboard/CommissionChart';
import { 
  DollarSign, 
  CreditCard, 
  FileQuestion, 
  CheckCircle 
} from 'lucide-react';
import { commissionChartData, mockInquiries, closedInquiries } from '@/data/mockData';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Commission Dashboard</h1>
          <p className="text-muted-foreground">Overview of your commission metrics and inquiries</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Gross Commission" 
            value="$285,000" 
            description="Total commissions YTD" 
            icon={DollarSign}
            trend={8.2}
            colorClass="bg-blue-50 text-commission-blue"
          />
          
          <StatCard 
            title="Commissions Paid" 
            value="$249,000" 
            description="87.4% of gross" 
            icon={CreditCard}
            trend={5.7}
            colorClass="bg-green-50 text-commission-green"
          />
          
          <StatCard 
            title="Open Inquiries" 
            value="24" 
            description="Requiring action" 
            icon={FileQuestion}
            trend={-12.5}
            colorClass="bg-orange-50 text-commission-orange"
          />
          
          <StatCard 
            title="Closed Inquiries" 
            value="132" 
            description="Last 30 days" 
            icon={CheckCircle}
            trend={3.8}
            colorClass="bg-purple-50 text-purple-700"
          />
        </div>
        
        {/* Commission Chart */}
        <div className="mb-8">
          <CommissionChart data={commissionChartData} />
        </div>
        
        {/* Inquiries Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InquiryTable 
            inquiries={mockInquiries} 
            title="Open Commission Inquiries" 
          />
          
          <InquiryTable 
            inquiries={closedInquiries} 
            title="Recently Closed Inquiries" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
