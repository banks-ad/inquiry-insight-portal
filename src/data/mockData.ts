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
  customer: string;
  provider: string;
  product: string;
  amount: number;
  status: string;
  type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'inquiries' | 'pending';
  accountNumber?: string;
  netBilled?: number;
  rate?: string;
  commissionType?: string;
  paidCommission?: number;
  expectedCommission?: number;
  ticketNumber?: string;
  inquiryDate?: string;
  closedDate?: string;
  orderNumber?: string;
  activatedDate?: string;
  expectedCommissionDate?: string;
  adjustmentType?: string;
  varianceLastMonth?: number;
  varianceTwoMonths?: number;
  varianceThreeMonths?: number;
}

// Companies for generating sample data
const companies = [
  'Acme Corp', 'Global Industries', 'Tech Solutions', 'InnoSys LLC', 'DataStream Inc', 
  'Enterprise Solutions', 'Digital Networks', 'Pinnacle Systems', 'Quantum Communications',
  'Alpha Technologies', 'Beta Innovations', 'Gamma Services', 'Delta Solutions', 'Epsilon Corp',
  'Omega Group', 'Zeta Communications', 'Theta Networks', 'Sigma Tech', 'Lambda Systems',
  'Omicron Data', 'Pi Analytics', 'Rho Enterprises', 'Tau Industries', 'Upsilon Technologies',
  'Phi Consulting', 'Chi Telecommunications', 'Psi Dynamics', 'Kappa Solutions', 'Iota Systems',
  'NuWave Communications', 'ByteStream Solutions', 'CloudSphere Technologies', 'DataForge Inc',
  'EdgePoint Networks', 'FutureScale Systems', 'GlobalSync Telecom', 'HyperLogic Corp',
  'InfinityByte Technologies', 'JetStream Communications', 'KineticData Systems',
  'LuminaNet Solutions', 'MetaLogic Technologies', 'NetSphere Innovations', 'OrbitalLink Corp',
  'PrimeWave Communications', 'QuantumEdge Networks', 'RapidCore Technologies', 'SkyBridge Systems',
  'TeraByte Solutions', 'UniCore Networks', 'VelocityNet Corp', 'WaveForm Technologies',
  'XenonSys Solutions'
];

// Providers for generating sample data
const providers = [
  'Lumen', 'Comcast', 'Spectrum', 'Microsoft', 'Adobe', 'AWS', 'Google Cloud', 'IBM Cloud',
  'Verizon', 'AT&T', 'CenturyLink', 'Oracle', 'Salesforce', 'Zoom', 'RingCentral', 'Vonage'
];

// Products for generating sample data
const products = [
  'Dedicated Internet', 'Business Internet', 'Voice Services', 'Microsoft 365', 'Creative Suite',
  'SD-WAN', 'Cloud Hosting', 'VoIP Solutions', 'Unified Communications', 'Security Services',
  'Data Backup', 'Disaster Recovery', 'Email Services', 'Video Conferencing', 'Team Collaboration',
  'DaaS', 'IaaS', 'PaaS', 'SaaS', 'UCaaS', 'CCaaS', 'Security as a Service', 'Network as a Service',
  'Managed Services', 'Professional Services', 'Consulting Services', 'Support Services'
];

// Statuses for generating sample data
const statuses = ['Paid', 'Pending', 'Disputed', 'Approved', 'Adjusted', 'Active', 'Provisioning', 'Submitted'];

// Adjustment types for generating sample data
const adjustmentTypes = [
  'Rate Correction', 'Billing Error', 'Contract Renewal Bonus', 'Service Credit', 'Promo Adjustment',
  'Tier Change', 'Commission Reclaim', 'Manual Adjustment', 'Credit', 'Bonus', 'Penalty', 'Fee'
];

// Spiff types for generating sample data
const spiffTypes = [
  'New Customer Bonus', 'Q1 Sales Bonus', 'Service Upgrade Bonus', 'Contract Extension',
  'Cross-Sell Bonus', 'Upsell Incentive', 'Annual Promo', 'Quarterly SPIFF', 'Monthly Challenge',
  'Product Launch Bonus', 'Customer Loyalty Bonus', 'Renewal Bonus'
];

// Cycles for generating sample data
const cycles = ['2025-04', '2025-03', '2025-02', '2025-01', '2024-12', '2024-11'];

// Helper function to generate random unique ID
const generateId = (prefix: string, index: number) => `${prefix}-${index.toString().padStart(3, '0')}`;

// Helper function to get random item from array
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate random number within range
const getRandomNumber = (min: number, max: number): number => 
  min + Math.random() * (max - min);

// Helper function to format date
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Generate random dates within a range
const getRandomDate = (start: Date, end: Date): string => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return formatDate(randomDate);
};

// Helper function to get random commission type with weighted distribution
const getRandomCommissionType = () => {
  const types = ['Recurring', 'Non-recurring', 'SPIFF', 'Adjustment'];
  const weights = [0.7, 0.1, 0.1, 0.1]; // 70% chance of Recurring
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return types[i];
  }
  return types[0];
};

// Generate commission entries with weighted type distribution
const generateCommissionEntries = (count: number, type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'pending'): CommissionEntry[] => {
  const entries: CommissionEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const cycle = getRandomItem(cycles);
    const provider = getRandomItem(providers);
    const product = type === 'spiffs' ? getRandomItem(spiffTypes) : getRandomItem(products);
    const customer = getRandomItem(companies);
    
    // Base entry with common fields
    const baseEntry: Partial<CommissionEntry> = {
      id: generateId(type.substring(0, 3), i + 1),
      cycle,
      customer,
      provider,
      product,
      type
    };
    
    if (type === 'commissions') {
      const netBilled = getRandomNumber(3000, 15000);
      const ratePercentage = getRandomNumber(12, 18);
      const amount = netBilled * (ratePercentage / 100);
      
      entries.push({
        ...baseEntry,
        amount: parseFloat(amount.toFixed(2)),
        status: 'Paid',
        accountNumber: `${customer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        netBilled: parseFloat(netBilled.toFixed(2)),
        rate: `${ratePercentage.toFixed(1)}%`,
        commissionType: getRandomCommissionType()
      } as CommissionEntry);
    } 
    else if (type === 'spiffs') {
      entries.push({
        ...baseEntry,
        amount: parseFloat(getRandomNumber(100, 1000).toFixed(2)),
        status: 'Paid',
        accountNumber: `${customer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        netBilled: 0,
        rate: 'Flat',
        commissionType: 'One-time'
      } as CommissionEntry);
    }
    else if (type === 'adjustments') {
      const isPositive = Math.random() > 0.5;
      const amount = isPositive 
        ? parseFloat(getRandomNumber(100, 800).toFixed(2))
        : parseFloat((-1 * getRandomNumber(100, 600)).toFixed(2));
      
      entries.push({
        ...baseEntry,
        amount,
        status: 'Adjusted',
        accountNumber: `${customer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        adjustmentType: getRandomItem(adjustmentTypes)
      } as CommissionEntry);
    }
    else if (type === 'disputes') {
      const netBilled = getRandomNumber(5000, 20000);
      const expectedCommission = parseFloat((netBilled * getRandomNumber(0.15, 0.18)).toFixed(2));
      const paidCommission = parseFloat((expectedCommission * getRandomNumber(0.5, 0.9)).toFixed(2));
      
      entries.push({
        ...baseEntry,
        amount: paidCommission,
        status: 'Disputed',
        accountNumber: `${customer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        netBilled: parseFloat(netBilled.toFixed(2)),
        expectedCommission,
        paidCommission,
        ticketNumber: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
        inquiryDate: getRandomDate(new Date(2025, 0, 1), new Date(2025, 3, 30)),
        closedDate: Math.random() > 0.7 ? getRandomDate(new Date(2025, 3, 1), new Date(2025, 3, 30)) : ''
      } as CommissionEntry);
    }
    else if (type === 'pending') {
      const randomStatus = getRandomItem(['Provisioning', 'Submitted', 'Active']);
      const activatedDate = randomStatus === 'Active' 
        ? getRandomDate(new Date(2025, 2, 1), new Date(2025, 3, 30)) 
        : '';
        
      entries.push({
        ...baseEntry,
        amount: parseFloat(getRandomNumber(500, 2000).toFixed(2)),
        status: randomStatus,
        orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        activatedDate,
        expectedCommissionDate: getRandomDate(new Date(2025, 3, 15), new Date(2025, 6, 30))
      } as CommissionEntry);
    }
  }
  
  return entries;
};

// Add some specific entries to ensure we have data for recent months
const specificEntries: CommissionEntry[] = [
  // April 2025 Entries - will be used on first load
  {
    id: 'com-001',
    cycle: '2025-04',
    customer: 'Acme Corp',
    provider: 'Lumen',
    product: 'Dedicated Internet',
    amount: 1250.00,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'ACM-1234',
    netBilled: 7500.00,
    rate: '16.7%',
    commissionType: 'Recurring'
  },
  {
    id: 'spi-001',
    cycle: '2025-04',
    customer: 'Acme Corp',
    provider: 'Lumen',
    product: 'New Customer Bonus',
    amount: 500.00,
    status: 'Paid',
    type: 'spiffs',
    accountNumber: 'ACM-1234',
    netBilled: 0.00,
    rate: 'Flat',
    commissionType: 'One-time'
  },
  {
    id: 'adj-001',
    cycle: '2025-04',
    customer: 'Global Industries',
    provider: 'Comcast',
    product: 'Rate Correction',
    amount: -125.50,
    status: 'Adjusted',
    type: 'adjustments',
    accountNumber: 'GLB-5678',
    adjustmentType: 'Rate Correction'
  }
];

// Generate 100 commission entries
const generatedCommissions = generateCommissionEntries(100, 'commissions');
const generatedSpiffs = generateCommissionEntries(50, 'spiffs');
const generatedAdjustments = generateCommissionEntries(100, 'adjustments');
const generatedDisputes = generateCommissionEntries(30, 'disputes');
const generatedPending = generateCommissionEntries(20, 'pending');

// Combine all data into a single export
export const mockCommissionsData: CommissionEntry[] = [
  ...specificEntries,
  ...generatedCommissions,
  ...generatedSpiffs,
  ...generatedAdjustments,
  ...generatedDisputes,
  ...generatedPending
];

// New Account interface for variance data
export interface AccountVariance extends CommissionEntry {
  varianceLastMonth: number;
  varianceTwoMonths: number;
  varianceThreeMonths: number;
}

// Mock data for new accounts
export const newAccountsData = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: getRandomCommissionType(),
  status: 'Active',
  activatedDate: faker.date.recent().toISOString().split('T')[0],
  expectedCommissionDate: faker.date.future().toISOString().split('T')[0]
}));

// Mock data for lost accounts
export const lostAccountsData = Array.from({ length: 15 }, () => ({
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
  type: getRandomCommissionType(),
  status: 'Inactive'
}));

// Mock data for account variance
export const accountVarianceData: AccountVariance[] = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  cycle: '2025-04',
  provider: faker.company.name(),
  product: faker.commerce.productName(),
  accountNumber: faker.finance.accountNumber(),
  customer: faker.company.name(),
  netBilled: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
  amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
  rate: faker.number.float({ min: 0.01, max: 0.15, fractionDigits: 3 }).toFixed(3),
  type: getRandomCommissionType(),
  status: 'Active',
  varianceLastMonth: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 }),
  varianceTwoMonths: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 }),
  varianceThreeMonths: faker.number.float({ min: -1000, max: 1000, fractionDigits: 2 })
}));
