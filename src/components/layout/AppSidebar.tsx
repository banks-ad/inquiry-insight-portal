
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  FileText, 
  DollarSign,
  TrendingUp,
  Clock,
  CalendarRange,
  FileSpreadsheet,
  ExternalLink,
  Home,
  FileQuestion
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  return (
    <Sidebar className={className}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commissions/overview" className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    <span>Overview</span>
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
                  <Link to="/commissions/payments" className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commissions/inquiries" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Inquiries</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commissions/forecast" className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    <span>Commission Forecast</span>
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
                    <Clock className="mr-2 h-5 w-5" />
                    <span>Open Orders Aging</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a 
                    href="https://www.appdirect.com/partners/advisors/telco-rate-card" 
                    className="flex items-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Rates & SPIFFS</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/commissions/provider-payment" className="flex items-center">
                    <FileQuestion className="mr-2 h-5 w-5" />
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
                  <Link to="/reports/account-history" className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>Account History</span>
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

