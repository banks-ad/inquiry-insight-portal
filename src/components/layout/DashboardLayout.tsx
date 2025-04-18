
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
  const showSidebar = location.pathname.includes('/commissions');

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <div className="w-full">
          <TopNavigation />
        </div>
        <div className="flex flex-1">
          {showSidebar && <AppSidebar />}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
