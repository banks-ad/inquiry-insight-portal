import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockInquiries, closedInquiries } from '@/data/mockData';
import InquiriesTable from '@/components/inquiries/InquiriesTable';
import StatCard from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { FilePlus, DollarSign, FileQuestion, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { mockTickets } from '@/data/mockTicketData';

const enhancedMockInquiries = mockInquiries.map(inquiry => ({
  ...inquiry,
  recoveredAmount: inquiry.status === "Closed" 
    ? Math.round(inquiry.expectedCommission * 0.85) 
    : undefined
}));

const enhancedClosedInquiries = closedInquiries.map(inquiry => ({
  ...inquiry,
  recoveredAmount: Math.round(inquiry.expectedCommission * 0.9)
}));

const enhancedTickets = mockTickets.map(ticket => ({
  ...ticket,
  recoveredAmount: ['Resolved', 'Closed'].includes(ticket.status)
    ? Math.round(ticket.expectedCommission * 0.92)
    : undefined
}));

const filterPeriods = {
  'all': 'All Time',
  'ytd': 'Year to Date',
  'month': 'This Month',
  'quarter': 'This Quarter',
  'year': 'Last Year'
};

const InquiriesPage = () => {
  const allInquiries = [...enhancedMockInquiries, ...enhancedClosedInquiries];
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Closed">("All");
  const [timeFilter, setTimeFilter] = useState('all');
  
  const filteredInquiries = statusFilter === "All" 
    ? allInquiries 
    : allInquiries.filter(inquiry => inquiry.status === statusFilter);

  const openInquiriesCount = allInquiries.filter(inquiry => inquiry.status === "Open").length;
  const closedInquiriesCount = allInquiries.filter(inquiry => inquiry.status === "Closed").length;

  const totalRecoveredAmount = useMemo(() => {
    let closedInquiriesAmount = allInquiries
      .filter(inquiry => inquiry.status === "Closed")
      .reduce((sum, inquiry) => sum + (inquiry.recoveredAmount || 0), 0);

    let resolvedTicketsAmount = enhancedTickets
      .filter(ticket => ['Resolved', 'Closed'].includes(ticket.status))
      .reduce((sum, ticket) => sum + (ticket.recoveredAmount || 0), 0);

    return closedInquiriesAmount + resolvedTicketsAmount;
  }, [allInquiries, enhancedTickets]);

  const recoveryChartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return Array.from({ length: 6 }).map((_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      const randomFactor = 0.7 + Math.random() * 0.6;
      return {
        month: months[monthIndex],
        amount: Math.round(25000 * randomFactor)
      };
    });
  }, []);

  const handleCreateInquiry = () => {
    toast.info("Create inquiry functionality coming soon");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Inquiries</h1>
            <p className="text-muted-foreground">Manage and review commission inquiries</p>
          </div>
          <Button onClick={handleCreateInquiry}>
            <FilePlus className="mr-2 h-4 w-4" />
            Create New Inquiry
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Commission Recovery Dashboard</h2>
            <Select 
              defaultValue={timeFilter} 
              onValueChange={setTimeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(filterPeriods).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-6">
            <StatCard 
              title="Total Recovered" 
              value={`$${totalRecoveredAmount.toLocaleString()}`} 
              description={filterPeriods[timeFilter as keyof typeof filterPeriods]} 
              icon={DollarSign}
              trend={8.3}
              colorClass="bg-green-50 text-commission-green"
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Recovered Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  amount: { 
                    theme: { light: '#22c55e', dark: '#4ade80' },
                    label: 'Recovery Amount'
                  }
                }}
                className="h-80"
              >
                <BarChart data={recoveryChartData}>
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        formatter={(value) => `$${value.toLocaleString()}`}
                      />
                    }
                  />
                  <Bar 
                    dataKey="amount"
                    name="Recovery Amount"
                    fill="var(--color-amount)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <StatCard 
            title="Open Inquiries" 
            value={openInquiriesCount.toString()} 
            description="Requiring action" 
            icon={FileQuestion}
            trend={-12.5}
            colorClass="bg-orange-50 text-commission-orange"
          />
          
          <StatCard 
            title="Closed Inquiries" 
            value={closedInquiriesCount.toString()} 
            description="Last 30 days" 
            icon={CheckCircle}
            trend={3.8}
            colorClass="bg-purple-50 text-purple-700"
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Tabs defaultValue="All" onValueChange={(value) => setStatusFilter(value as "All" | "Open" | "Closed")}>
            <TabsList>
              <TabsTrigger value="All">All Inquiries</TabsTrigger>
              <TabsTrigger value="Open">Open</TabsTrigger>
              <TabsTrigger value="Closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Select defaultValue="date-desc">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <InquiriesTable inquiries={filteredInquiries} />
      </div>
    </DashboardLayout>
  );
};

export default InquiriesPage;
