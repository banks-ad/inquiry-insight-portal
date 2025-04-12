
import { Inquiry } from '@/components/dashboard/InquiryTable';

// Mock commission data for charts
export const commissionChartData = [
  { name: 'Jan', gross: 40000, paid: 36000 },
  { name: 'Feb', gross: 45000, paid: 40000 },
  { name: 'Mar', gross: 35000, paid: 30000 },
  { name: 'Apr', gross: 50000, paid: 43000 },
  { name: 'May', gross: 55000, paid: 48000 },
  { name: 'Jun', gross: 60000, paid: 52000 },
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
