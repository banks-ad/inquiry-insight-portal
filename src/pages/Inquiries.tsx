
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockInquiries, closedInquiries } from '@/data/mockData';
import InquiriesTable from '@/components/inquiries/InquiriesTable';
import StatCard from '@/components/dashboard/StatCard';
import { FileQuestion, CheckCircle } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InquiriesPage = () => {
  // Combine both inquiry datasets
  const allInquiries = [...mockInquiries, ...closedInquiries];
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Closed">("All");
  
  // Filter inquiries based on status
  const filteredInquiries = statusFilter === "All" 
    ? allInquiries 
    : allInquiries.filter(inquiry => inquiry.status === statusFilter);

  // Count of open and closed inquiries
  const openInquiriesCount = allInquiries.filter(inquiry => inquiry.status === "Open").length;
  const closedInquiriesCount = allInquiries.filter(inquiry => inquiry.status === "Closed").length;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <p className="text-muted-foreground">Manage and review commission inquiries</p>
        </div>

        {/* Stats Cards */}
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

