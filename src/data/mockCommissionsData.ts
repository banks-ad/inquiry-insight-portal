export interface CommissionEntry {
  id: string;
  cycle: string;
  customer: string;
  provider: string;
  product: string;
  amount: number;
  status: string;
  type: 'commissions' | 'spiffs' | 'adjustments' | 'disputes' | 'pending';
  // New fields
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

// Generate commission entries
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
    
    // Add type-specific fields
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
        commissionType: 'Recurring'
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
      entries.push({
        ...baseEntry,
        amount: parseFloat(getRandomNumber(500, 2000).toFixed(2)),
        status: 'Provisioned',
        orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        activatedDate: getRandomDate(new Date(2025, 2, 1), new Date(2025, 3, 30)),
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

// Generate the different types of entries
const generatedCommissions = generateCommissionEntries(300, 'commissions');
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
