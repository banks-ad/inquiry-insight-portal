
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockInquiries, closedInquiries } from '@/data/mockData';
import InquiriesTable from '@/components/inquiries/InquiriesTable';
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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filter inquiries based on status
  const filteredInquiries = statusFilter === "all" 
    ? allInquiries 
    : allInquiries.filter(inquiry => inquiry.status === statusFilter);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <p className="text-muted-foreground">Manage and review commission inquiries</p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All Inquiries</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
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
