
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
  Clock,
  ExternalLink,
  TrendingUp
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/payments" className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="https://catalog.appdirect.com/provider-sales/reports/my-order-aging" 
                    className="flex items-center"
                    target="_self" 
                    rel="noopener noreferrer"
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Open Orders Aging</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="https://www.appdirect.com/partners/advisors/telco-rate-card" 
                    className="flex items-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Rates & SPIFFS</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commission-forecast" className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    <span>Commission Forecast</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/provider-payment-info" className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Provider Payment Info</span>
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
                    <span>Summary by Provider</span>
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
                  <Link to="/reports/history" className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>RPM Export</span>
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
