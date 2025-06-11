
import React from 'react';
import { 
  Navbar, 
  NavLink, 
  Group, 
  Text, 
  Stack,
  Box,
  ScrollArea
} from '@mantine/core';
import { 
  FileText, 
  DollarSign,
  TrendingUp,
  Clock,
  CalendarRange,
  FileSpreadsheet,
  ExternalLink,
  Home,
  FileQuestion,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  return (
    <Navbar 
      p="md" 
      className={className} 
      width={{ base: 300 }}
      height="100vh"
    >
      <Navbar.Section 
        grow
        component={ScrollArea}
        mx="-xs"
        px="xs"
      >
        <Box mb="lg">
          <Text fz="sm" fw={500} c="dimmed" mb="xs">Main</Text>
          <Stack spacing={0}>
            <NavLink
              component={Link}
              to="/commissions/overview"
              label="Overview"
              icon={<Home size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions"
              label="Commissions"
              icon={<DollarSign size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions/payments"
              label="Payments"
              icon={<DollarSign size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions/pending-orders"
              label="Pending Orders"
              icon={<Package size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions/inquiries"
              label="Inquiries"
              icon={<FileText size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions/forecast"
              label="Commission Forecast"
              icon={<TrendingUp size={20} />}
            />
            <NavLink
              component="a"
              href="https://catalog.appdirect.com/provider-sales/reports/my-order-aging"
              target="_self"
              rel="noopener noreferrer"
              label={
                <Group spacing={4}>
                  <Text>Open Orders Aging</Text>
                  <ExternalLink size={12} />
                </Group>
              }
              icon={<Clock size={20} />}
            />
          </Stack>
        </Box>

        <Box mb="lg">
          <Text fz="sm" fw={500} c="dimmed" mb="xs">Resources</Text>
          <Stack spacing={0}>
            <NavLink
              component="a"
              href="https://www.appdirect.com/partners/advisors/telco-rate-card"
              target="_blank"
              rel="noopener noreferrer"
              label={
                <Group spacing={4}>
                  <Text>Rates & SPIFFS</Text>
                  <ExternalLink size={12} />
                </Group>
              }
              icon={<FileText size={20} />}
            />
            <NavLink
              component={Link}
              to="/commissions/provider-payment"
              label="Provider Payment Info"
              icon={<FileQuestion size={20} />}
            />
          </Stack>
        </Box>

        <Box>
          <Text fz="sm" fw={500} c="dimmed" mb="xs">Reports</Text>
          <Stack spacing={0}>
            <NavLink
              component={Link}
              to="/reports/statement"
              label="Statement"
              icon={<FileSpreadsheet size={20} />}
            />
            <NavLink
              component={Link}
              to="/reports/provider"
              label="Summary by Provider"
              icon={<CalendarRange size={20} />}
            />
            <NavLink
              component={Link}
              to="/reports/account-history"
              label="Account History"
              icon={<Clock size={20} />}
            />
          </Stack>
        </Box>
      </Navbar.Section>
      {/* Removed the empty Navbar.Section that was causing the error */}
    </Navbar>
  );
};

export default AppSidebar;
