import { Inquiry } from '@/components/dashboard/InquiryTable';

// Mock commission data for charts
export const commissionChartData = [
  {
    name: 'Jan',
    gross: 32000,
    paid: 28000,
    spiff: 3000,
    nonRecurring: 1000,
  },
  {
    name: 'Feb',
    gross: 34000,
    paid: 29500,
    spiff: 3200,
    nonRecurring: 1300,
  },
  {
    name: 'Mar',
    gross: 36000,
    paid: 31000,
    spiff: 3500,
    nonRecurring: 1500,
  },
  {
    name: 'Apr',
    gross: 35000,
    paid: 30000,
    spiff: 3400,
    nonRecurring: 1600,
  },
  {
    name: 'May',
    gross: 38000,
    paid: 33000,
    spiff: 3600,
    nonRecurring: 1400,
  },
  {
    name: 'Jun',
    gross: 42000,
    paid: 36000,
    spiff: 4000,
    nonRecurring: 2000,
  },
  {
    name: 'Jul',
    gross: 45000,
    paid: 39000,
    spiff: 4200,
    nonRecurring: 1800,
  }
];

// Mock commission inquiries
export const mockInquiries: Inquiry[] = [
  {
    id: '1',
    client: 'Acme Corp',
    agent: 'John Smith',
    amount: 12500,
    date: '2025-04-01',
    status: 'open',
  },
  {
    id: '2',
    client: 'TechStart Inc.',
    agent: 'Sarah Johnson',
    amount: 8700,
    date: '2025-04-03',
    status: 'open',
  },
  {
    id: '3',
    client: 'Global Logistics',
    agent: 'Michael Brown',
    amount: 15200,
    date: '2025-04-05',
    status: 'open',
  },
  {
    id: '4',
    client: 'Pinnacle Realty',
    agent: 'Emma Wilson',
    amount: 9300,
    date: '2025-04-07',
    status: 'open',
  },
  {
    id: '5',
    client: 'Northwest Retail',
    agent: 'James Taylor',
    amount: 6800,
    date: '2025-04-09',
    status: 'open',
  },
];

export const closedInquiries: Inquiry[] = [
  {
    id: '6',
    client: 'Summit Software',
    agent: 'Alex Turner',
    amount: 11200,
    date: '2025-03-25',
    status: 'closed',
  },
  {
    id: '7',
    client: 'Coastal Properties',
    agent: 'Linda Parker',
    amount: 7300,
    date: '2025-03-28',
    status: 'closed',
  },
  {
    id: '8',
    client: 'River Media Group',
    agent: 'Robert Davis',
    amount: 9800,
    date: '2025-03-30',
    status: 'closed',
  },
  {
    id: '9',
    client: 'Horizon Health',
    agent: 'Jennifer Lopez',
    amount: 13500,
    date: '2025-04-02',
    status: 'closed',
  },
  {
    id: '10',
    client: 'Evergreen Solutions',
    agent: 'Thomas Wilson',
    amount: 8200,
    date: '2025-04-04',
    status: 'closed',
  },
];
