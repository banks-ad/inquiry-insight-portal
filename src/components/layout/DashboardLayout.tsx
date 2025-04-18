
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname.includes('/commissions') || 
                      location.pathname.startsWith('/reports/');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {showSidebar && <AppSidebar />}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
