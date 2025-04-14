import { faker } from '@faker-js/faker';

// Chart data interface
export interface ChartData {
  name: string;
  spiff: number;
  nonRecurring: number;
  adjustments: number;
  recurring: number;
}

// Provider data interface for chart
export interface ProviderData {
  provider: string;
  grossCommission: number;
}

// Customer data interface for chart
export interface CustomerData {
  customer: string;
  grossCommission: number;
}

// Inquiry interface
export interface Inquiry {
  id: string;
  client: string;
  agent: string;
  amount: number;
  date: string;
  status: 'open' | 'closed';
}

// Commission chart data
export const commissionChartData: ChartData[] = [
  {
    name: "Jan",
    recurring: 85000,
    spiff: 15000,
    nonRecurring: 25000,
    adjustments: 5000,
  },
  {
    name: "Feb",
    recurring: 95000,
    spiff: 18000,
    nonRecurring: 22000,
    adjustments: 8000,
  },
  {
    name: "Mar",
    recurring: 92000,
    spiff: 20000,
    nonRecurring: 28000,
    adjustments: 6000,
  },
  {
    name: "Apr",
    recurring: 98000,
    spiff: 22000,
    nonRecurring: 30000,
    adjustments: 7000,
  },
  {
    name: "May",
    recurring: 105000,
    spiff: 25000,
    nonRecurring: 32000,
    adjustments: 9000,
  },
  {
    name: "Jun",
    recurring: 110000,
    spiff: 28000,
    nonRecurring: 35000,
    adjustments: 8000,
  }
];

// Mock data for Top Providers chart
export const topProvidersData: ProviderData[] = Array.from({ length: 5 }, () => ({
  provider: faker.company.name(),
  grossCommission: faker.number.int({ min: 50000, max: 200000 }),
}));

// Mock data for Top Customers chart
export const topCustomersData: CustomerData[] = Array.from({ length: 5 }, () => ({
  customer: faker.company.name(),
  grossCommission: faker.number.int({ min: 60000, max: 220000 }),
}));

// Mock inquiries
export const mockInquiries = [
  {
    id: '1',
    requestor: 'John Smith',
    ticketNumber: 'TK-1001',
    subject: 'Missing Commission - Cloud Services',
    customer: 'Acme Corp',
    provider: 'AWS',
    expectedCommission: 2500.00,
    status: 'Open',
    priority: 'High'
  },
  {
    id: '2',
    requestor: 'Sarah Johnson',
    ticketNumber: 'TK-1002',
    subject: 'Commission Rate Discrepancy',
    customer: 'TechStart Inc',
    provider: 'Microsoft',
    expectedCommission: 1800.00,
    status: 'Closed',
    priority: 'Medium'
  },
  {
    id: '3',
    requestor: 'Mike Wilson',
    ticketNumber: 'TK-1003',
    subject: 'Missing SPIFF Payment',
    customer: 'Global Solutions',
    provider: 'Google Cloud',
    expectedCommission: 3500.00,
    status: 'Open',
    priority: 'High'
  },
  {
    id: '4',
    requestor: 'Emily Chen',
    ticketNumber: 'TK-1004',
    subject: 'Partial Commission Received',
    customer: 'DataFlow Systems',
    provider: 'Oracle',
    expectedCommission: 1200.00,
    status: 'Open',
    priority: 'Low'
  },
  {
    id: '5',
    requestor: 'David Brown',
    ticketNumber: 'TK-1005',
    subject: 'Commission Calculation Error',
    customer: 'Innovation Labs',
    provider: 'IBM',
    expectedCommission: 2800.00,
    status: 'Closed',
    priority: 'Medium'
  }
] as const;

// Closed inquiries
export const closedInquiries = [
  {
    id: '6',
    requestor: 'Lisa Anderson',
    ticketNumber: 'TK-1006',
    subject: 'Missing Renewal Commission',
    customer: 'Tech Solutions Ltd',
    provider: 'Salesforce',
    expectedCommission: 1500.00,
    status: 'Closed',
    priority: 'Low'
  },
  {
    id: '7',
    requestor: 'Robert Taylor',
    ticketNumber: 'TK-1007',
    subject: 'SPIFF Eligibility Review',
    customer: 'Digital Dynamics',
    provider: 'VMware',
    expectedCommission: 2200.00,
    status: 'Closed',
    priority: 'Medium'
  }
] as const;
