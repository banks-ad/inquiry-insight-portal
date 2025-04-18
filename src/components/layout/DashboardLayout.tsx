
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
        <div className="pt-16 flex flex-1 relative">
          {showSidebar && (
            <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10 w-64">
              <AppSidebar />
            </div>
          )}
          <main className={`flex-1 ${showSidebar ? 'md:ml-64' : ''}`}>
            <div className="p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
