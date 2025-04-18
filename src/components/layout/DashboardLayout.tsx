
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import TopNavigation from './TopNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname.includes('/commissions') || location.pathname.includes('/reports');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <TopNavigation />
        <div className="flex-1 flex">
          {showSidebar && (
            <AppSidebar className="pt-16" /> // Add padding-top to match top nav height
          )}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
