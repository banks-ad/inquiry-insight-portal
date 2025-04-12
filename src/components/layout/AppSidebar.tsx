
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
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  Users, 
  BarChart, 
  Settings, 
  LineChart, 
  PieChart,
  FileBarChart,
  FileSpreadsheet,
  CalendarRange,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
                  <Link to="/" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/inquiries" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Inquiries</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commissions" className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Commissions</span>
                  </Link>
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
                  <Link to="/reports/statement" className="flex items-center">
                    <FileSpreadsheet className="mr-2 h-5 w-5" />
                    <span>Statement</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/provider" className="flex items-center">
                    <CalendarRange className="mr-2 h-5 w-5" />
                    <span>6 Month by Provider</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/history" className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>Account History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/commission-trends" className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    <span>Commission Trends</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/performance" className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    <span>Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/distribution" className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    <span>Distribution</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reports/quarterly" className="flex items-center">
                    <FileBarChart className="mr-2 h-5 w-5" />
                    <span>Quarterly Report</span>
                  </Link>
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
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </Link>
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
