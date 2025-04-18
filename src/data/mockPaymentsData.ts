
import { faker } from '@faker-js/faker';

export interface Payment {
  id: string;
  status: 'Complete' | 'Pending' | 'Failed';
  date: string;
  netReceivable: number;
}

export const mockPaymentsData: Payment[] = Array.from({ length: 15 }, () => ({
  id: faker.string.alphanumeric(8).toUpperCase(),
  status: 'Complete',
  date: faker.date.recent({ days: 30 }).toLocaleDateString(),
  netReceivable: faker.number.int({ min: 1000, max: 50000 }),
}));
