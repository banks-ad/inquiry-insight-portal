import { faker } from '@faker-js/faker';

interface TopProviderData {
  name: string;
  value: number;
}

interface TopCustomerData {
  name: string;
  value: number;
}

interface ChartData {
  name: string;
  spiff: number;
  nonRecurring: number;
  adjustments: number;
  recurring: number;
}

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
export const topProvidersData: TopProviderData[] = Array.from({ length: 5 }, () => ({
  name: faker.company.name(),
  value: faker.number.int({ min: 50000, max: 200000 }),
}));

// Mock data for Top Customers chart
export const topCustomersData: TopCustomerData[] = Array.from({ length: 5 }, () => ({
  name: faker.company.name(),
  value: faker.number.int({ min: 60000, max: 220000 }),
}));
