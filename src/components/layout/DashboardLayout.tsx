
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
  // Show sidebar for all routes in commissions section
  const showSidebar = location.pathname.includes('/commissions');

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col">
        <TopNavigation />
        <div className="flex-1 flex">
          {showSidebar && <AppSidebar />}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
