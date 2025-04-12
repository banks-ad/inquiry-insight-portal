
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  Home, 
  FileText, 
  DollarSign, 
  Users, 
  BarChart, 
  Settings, 
  LineChart, 
  PieChart,
  FileBarChart
} from 'lucide-react';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-commission-green" />
          <span className="text-lg font-bold">CommissionIQ</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/inquiries" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Inquiries</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/commissions" className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Commissions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/agents" className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    <span>Agents</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Reports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/reports/commission-trends" className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    <span>Commission Trends</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/reports/performance" className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    <span>Performance</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/reports/distribution" className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    <span>Distribution</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/reports/quarterly" className="flex items-center">
                    <FileBarChart className="mr-2 h-5 w-5" />
                    <span>Quarterly Report</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute top-2 right-2 md:hidden">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
