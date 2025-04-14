
import { faker } from '@faker-js/faker';

export interface ProviderPayment {
  id: string;
  status: 'Complete' | 'Pending' | 'Failed';
  date: string;
  netReceivable: number;
}

export const mockProviderPaymentData: ProviderPayment[] = Array.from({ length: 20 }, () => ({
  id: faker.string.alphanumeric(8).toUpperCase(),
  status: faker.helpers.arrayElement(['Complete', 'Pending', 'Failed']),
  date: faker.date.recent({ days: 30 }).toLocaleDateString(),
  netReceivable: faker.number.int({ min: 1000, max: 50000 }),
}));
