
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
export const mockInquiries: Inquiry[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  client: faker.company.name(),
  agent: faker.person.fullName(),
  amount: faker.number.int({ min: 2000, max: 15000 }),
  date: faker.date.recent({ days: 30 }).toLocaleDateString(),
  status: 'open',
}));

// Closed inquiries
export const closedInquiries: Inquiry[] = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  client: faker.company.name(),
  agent: faker.person.fullName(),
  amount: faker.number.int({ min: 2000, max: 15000 }),
  date: faker.date.recent({ days: 60 }).toLocaleDateString(),
  status: 'closed',
}));
