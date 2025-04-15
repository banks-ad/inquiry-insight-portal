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
  requestor: string;
  submitDate: string;
  ticketNumber: string;
  subject: string;
  customer: string;
  provider: string;
  expectedCommission: number;
  status: 'Open' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
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
    submitDate: '2025-03-15',
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
    submitDate: '2025-03-18',
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
    submitDate: '2025-03-20',
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
    submitDate: '2025-03-22',
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
    submitDate: '2025-03-25',
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
    submitDate: '2025-03-10',
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
    submitDate: '2025-03-12',
    ticketNumber: 'TK-1007',
    subject: 'SPIFF Eligibility Review',
    customer: 'Digital Dynamics',
    provider: 'VMware',
    expectedCommission: 2200.00,
    status: 'Closed',
    priority: 'Medium'
  }
] as const;

export interface CommissionEntry {
  id: string;
  cycle: string;
  provider: string;
  product: string;
  accountNumber?: string;
  customer: string;
  netBilled?: number;
  amount: number;
  rate?: string;
  commissionType?: string;
  status: string;
  paidCommission?: number;
  expectedCommission?: number;
  ticketNumber?: string;
  inquiryDate?: string;
  closedDate?: string;
  orderNumber?: string;
  activatedDate?: string;
  expectedCommissionDate?: string;
  adjustmentType?: string;
}

// Mock commission data
export const mockCommissionsData: CommissionEntry[] = Array.from({ length: 50 }, (_, i) => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: faker.helpers.arrayElement(['commissions', 'spiffs', 'adjustments', 'disputes', 'pending']),
  status: faker.helpers.arrayElement(['Paid', 'Pending', 'Disputed', 'Approved', 'Adjusted']),
  paidCommission: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
  expectedCommission: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  ticketNumber: faker.string.alphanumeric(8),
  inquiryDate: faker.date.recent().toISOString().split('T')[0],
  closedDate: faker.date.recent().toISOString().split('T')[0],
  orderNumber: faker.string.alphanumeric(10),
  activatedDate: faker.date.past().toISOString().split('T')[0],
  expectedCommissionDate: faker.date.future().toISOString().split('T')[0],
  adjustmentType: faker.helpers.arrayElement(['Manual', 'Automatic']),
}));

// New Account interface for variance data
export interface AccountVariance extends CommissionEntry {
  varianceLastMonth: number;
  varianceTwoMonths: number;
  varianceThreeMonths: number;
}

// Mock data for new accounts
export const newAccountsData = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: 'new-accounts',
  status: 'Active'
}));

// Mock data for lost accounts
export const lostAccountsData = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  lastCommission: faker.date.recent().toISOString().split('T')[0],
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: 'lost-accounts',
  status: 'Inactive'
}));

// Mock data for account variance
export const accountVarianceData: AccountVariance[] = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: 'account-variance',
  status: 'Active',
  varianceLastMonth: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 }),
  varianceTwoMonths: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 }),
  varianceThreeMonths: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 })
}));
