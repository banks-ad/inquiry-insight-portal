
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
      <div className="min-h-screen w-full">
        <TopNavigation />
        <div className="flex pt-16">
          {showSidebar && <AppSidebar />}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
