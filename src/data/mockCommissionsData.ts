
export interface CommissionEntry {
  id: string;
  date: string;
  customer: string;
  provider: string;
  product: string;
  amount: number;
  status: string;
  type: 'commissions' | 'spiffs' | 'disputes' | 'pending';
  cycle: string;
}

export const mockCommissionsData: CommissionEntry[] = [
  // Commissions - April 2025
  {
    id: 'com-001',
    date: '2025-04-05',
    customer: 'Acme Corp',
    provider: 'Lumen',
    product: 'Dedicated Internet',
    amount: 1250.00,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-04'
  },
  {
    id: 'com-002',
    date: '2025-04-08',
    customer: 'Global Industries',
    provider: 'Comcast',
    product: 'Business Internet',
    amount: 875.50,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-04'
  },
  {
    id: 'com-003',
    date: '2025-04-12',
    customer: 'Tech Solutions',
    provider: 'Spectrum',
    product: 'Voice Services',
    amount: 1430.25,
    status: 'Pending',
    type: 'commissions',
    cycle: '2025-04'
  },
  {
    id: 'com-004',
    date: '2025-04-15',
    customer: 'InnoSys LLC',
    provider: 'Microsoft',
    product: 'Microsoft 365',
    amount: 945.00,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-04'
  },
  {
    id: 'com-005',
    date: '2025-04-18',
    customer: 'DataStream Inc',
    provider: 'Adobe',
    product: 'Creative Suite',
    amount: 1120.75,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-04'
  },

  // Spiffs - April 2025
  {
    id: 'spi-001',
    date: '2025-04-07',
    customer: 'Acme Corp',
    provider: 'Lumen',
    product: 'New Customer Bonus',
    amount: 500.00,
    status: 'Paid',
    type: 'spiffs',
    cycle: '2025-04'
  },
  {
    id: 'spi-002',
    date: '2025-04-14',
    customer: 'MarketEdge',
    provider: 'Comcast',
    product: 'Q1 Sales Bonus',
    amount: 750.00,
    status: 'Pending',
    type: 'spiffs',
    cycle: '2025-04'
  },
  {
    id: 'spi-003',
    date: '2025-04-21',
    customer: 'Bright Solutions',
    provider: 'Spectrum',
    product: 'Service Upgrade Bonus',
    amount: 350.00,
    status: 'Paid',
    type: 'spiffs',
    cycle: '2025-04'
  },

  // Disputes - April 2025
  {
    id: 'dis-001',
    date: '2025-04-03',
    customer: 'Green Energy Co',
    provider: 'Lumen',
    product: 'SD-WAN Service',
    amount: 1850.00,
    status: 'Disputed',
    type: 'disputes',
    cycle: '2025-04'
  },
  {
    id: 'dis-002',
    date: '2025-04-11',
    customer: 'Omega Manufacturing',
    provider: 'Comcast',
    product: 'Business Voice',
    amount: 675.50,
    status: 'Disputed',
    type: 'disputes',
    cycle: '2025-04'
  },

  // Pending - April 2025
  {
    id: 'pen-001',
    date: '2025-04-09',
    customer: 'Quick Logistics',
    provider: 'Spectrum',
    product: 'Business Internet',
    amount: 925.00,
    status: 'Pending',
    type: 'pending',
    cycle: '2025-04'
  },
  {
    id: 'pen-002',
    date: '2025-04-16',
    customer: 'Pinnacle Design',
    provider: 'Microsoft',
    product: 'Azure Services',
    amount: 1320.75,
    status: 'Pending',
    type: 'pending',
    cycle: '2025-04'
  },
  {
    id: 'pen-003',
    date: '2025-04-22',
    customer: 'Central Finance',
    provider: 'Adobe',
    product: 'Document Cloud',
    amount: 785.25,
    status: 'Pending',
    type: 'pending',
    cycle: '2025-04'
  },

  // March 2025 Data
  {
    id: 'com-101',
    date: '2025-03-10',
    customer: 'Premier Solutions',
    provider: 'Lumen',
    product: 'Fiber Internet',
    amount: 1575.50,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-03'
  },
  {
    id: 'com-102',
    date: '2025-03-15',
    customer: 'Allied Systems',
    provider: 'Comcast',
    product: 'Business Security',
    amount: 980.25,
    status: 'Paid',
    type: 'commissions',
    cycle: '2025-03'
  },
  {
    id: 'spi-101',
    date: '2025-03-18',
    customer: 'Velocity Inc',
    provider: 'Spectrum',
    product: 'Monthly Promo',
    amount: 450.00,
    status: 'Paid',
    type: 'spiffs',
    cycle: '2025-03'
  },
  {
    id: 'dis-101',
    date: '2025-03-05',
    customer: 'Summit Group',
    provider: 'Microsoft',
    product: 'SharePoint Services',
    amount: 1250.75,
    status: 'Disputed',
    type: 'disputes',
    cycle: '2025-03'
  },
  {
    id: 'pen-101',
    date: '2025-03-22',
    customer: 'NexGen Technologies',
    provider: 'Adobe',
    product: 'Analytics Suite',
    amount: 895.50,
    status: 'Pending',
    type: 'pending',
    cycle: '2025-03'
  }
];
