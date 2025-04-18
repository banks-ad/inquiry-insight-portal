
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
            <div className="mt-16 fixed left-0 top-0 h-screen z-10">
              <AppSidebar />
            </div>
          )}
          <main className={`flex-1 overflow-auto ${showSidebar ? 'md:ml-[16rem]' : ''}`}>
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
