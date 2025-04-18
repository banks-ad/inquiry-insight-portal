
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

  // Always wrap the content in SidebarProvider, even if the sidebar isn't shown
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <TopNavigation />
        <div className="flex flex-1">
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
