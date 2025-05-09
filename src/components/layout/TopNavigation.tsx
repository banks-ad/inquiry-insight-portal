import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const TopNavigation = () => {
  const location = useLocation();
  const isCommissionsPath = location.pathname.startsWith('/commissions');

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} functionality is coming soon!`, {
      description: 'Stay tuned for exciting updates.',
      position: 'top-right'
    });
  };

  return (
    <div className="w-full border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-2 mr-4">
          <DollarSign className="h-6 w-6 text-commission-green" />
          <span className="text-lg font-bold">commissionMOCK</span>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                location.pathname === "/" ? "bg-accent" : ""
              )}>
                Advisor Dashboard
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button 
                onClick={() => handleComingSoon('Provider Sales')}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Provider Sales
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button 
                onClick={() => handleComingSoon('AppDirect Sales')}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                AppDirect Sales
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/commissions/overview" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                isCommissionsPath ? "bg-accent" : ""
              )}>
                Commissions
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
