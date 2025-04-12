
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

export const mockCommissionsData: CommissionEntry[] = [
  // Commissions - April 2025
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
    id: 'com-002',
    cycle: '2025-04',
    customer: 'Global Industries',
    provider: 'Comcast',
    product: 'Business Internet',
    amount: 875.50,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'GLB-5678',
    netBilled: 5500.00,
    rate: '15.9%',
    commissionType: 'Recurring'
  },
  {
    id: 'com-003',
    cycle: '2025-04',
    customer: 'Tech Solutions',
    provider: 'Spectrum',
    product: 'Voice Services',
    amount: 1430.25,
    status: 'Pending',
    type: 'commissions',
    accountNumber: 'TEC-9012',
    netBilled: 8700.00,
    rate: '16.4%',
    commissionType: 'Recurring'
  },
  {
    id: 'com-004',
    cycle: '2025-04',
    customer: 'InnoSys LLC',
    provider: 'Microsoft',
    product: 'Microsoft 365',
    amount: 945.00,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'INN-3456',
    netBilled: 6300.00,
    rate: '15%',
    commissionType: 'Recurring'
  },
  {
    id: 'com-005',
    cycle: '2025-04',
    customer: 'DataStream Inc',
    provider: 'Adobe',
    product: 'Creative Suite',
    amount: 1120.75,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'DAT-7890',
    netBilled: 7450.00,
    rate: '15.04%',
    commissionType: 'Recurring'
  },

  // Spiffs - April 2025
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
    id: 'spi-002',
    cycle: '2025-04',
    customer: 'MarketEdge',
    provider: 'Comcast',
    product: 'Q1 Sales Bonus',
    amount: 750.00,
    status: 'Pending',
    type: 'spiffs',
    accountNumber: 'MKT-4567',
    netBilled: 0.00,
    rate: 'Flat',
    commissionType: 'One-time'
  },
  {
    id: 'spi-003',
    cycle: '2025-04',
    customer: 'Bright Solutions',
    provider: 'Spectrum',
    product: 'Service Upgrade Bonus',
    amount: 350.00,
    status: 'Paid',
    type: 'spiffs',
    accountNumber: 'BRT-8901',
    netBilled: 0.00,
    rate: 'Flat',
    commissionType: 'One-time'
  },
  
  // Adjustments - April 2025
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
  },
  {
    id: 'adj-002',
    cycle: '2025-04',
    customer: 'Tech Solutions',
    provider: 'Spectrum',
    product: 'Contract Renewal Bonus',
    amount: 200.00,
    status: 'Adjusted',
    type: 'adjustments',
    accountNumber: 'TEC-9012',
    adjustmentType: 'Bonus'
  },
  {
    id: 'adj-003',
    cycle: '2025-04',
    customer: 'InnoSys LLC',
    provider: 'Microsoft',
    product: 'Billing Error Correction',
    amount: -75.25,
    status: 'Adjusted',
    type: 'adjustments',
    accountNumber: 'INN-3456',
    adjustmentType: 'Billing Correction'
  },

  // Disputes - April 2025
  {
    id: 'dis-001',
    cycle: '2025-04',
    customer: 'Green Energy Co',
    provider: 'Lumen',
    product: 'SD-WAN Service',
    amount: 0.00,  // Actual
    expectedCommission: 1850.00,
    paidCommission: 0.00,
    status: 'Disputed',
    type: 'disputes',
    accountNumber: 'GRN-2345',
    netBilled: 12000.00,
    ticketNumber: 'TK-4567',
    inquiryDate: '2025-04-03',
    closedDate: ''
  },
  {
    id: 'dis-002',
    cycle: '2025-04',
    customer: 'Omega Manufacturing',
    provider: 'Comcast',
    product: 'Business Voice',
    amount: 450.30,  // Actual
    expectedCommission: 675.50,
    paidCommission: 450.30,
    status: 'Disputed',
    type: 'disputes',
    accountNumber: 'OMG-6789',
    netBilled: 4300.00,
    ticketNumber: 'TK-5678',
    inquiryDate: '2025-04-11',
    closedDate: ''
  },

  // Pending - April 2025
  {
    id: 'pen-001',
    cycle: '2025-04',
    customer: 'Quick Logistics',
    provider: 'Spectrum',
    product: 'Business Internet',
    amount: 925.00,  // Expected commission
    status: 'Provisioning',
    type: 'pending',
    orderNumber: 'ORD-12345',
    activatedDate: '2025-04-09',
    expectedCommissionDate: '2025-05-15'
  },
  {
    id: 'pen-002',
    cycle: '2025-04',
    customer: 'Pinnacle Design',
    provider: 'Microsoft',
    product: 'Azure Services',
    amount: 1320.75,
    status: 'Submitted',
    type: 'pending',
    orderNumber: 'ORD-23456',
    activatedDate: '',
    expectedCommissionDate: '2025-06-01'
  },
  {
    id: 'pen-003',
    cycle: '2025-04',
    customer: 'Central Finance',
    provider: 'Adobe',
    product: 'Document Cloud',
    amount: 785.25,
    status: 'Active',
    type: 'pending',
    orderNumber: 'ORD-34567',
    activatedDate: '2025-04-22',
    expectedCommissionDate: '2025-05-30'
  },

  // March 2025 Data
  {
    id: 'com-101',
    cycle: '2025-03',
    customer: 'Premier Solutions',
    provider: 'Lumen',
    product: 'Fiber Internet',
    amount: 1575.50,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'PRM-1122',
    netBilled: 9500.00,
    rate: '16.5%',
    commissionType: 'Recurring'
  },
  {
    id: 'com-102',
    cycle: '2025-03',
    customer: 'Allied Systems',
    provider: 'Comcast',
    product: 'Business Security',
    amount: 980.25,
    status: 'Paid',
    type: 'commissions',
    accountNumber: 'ALL-3344',
    netBilled: 6400.00,
    rate: '15.3%',
    commissionType: 'Recurring'
  },
  {
    id: 'spi-101',
    cycle: '2025-03',
    customer: 'Velocity Inc',
    provider: 'Spectrum',
    product: 'Monthly Promo',
    amount: 450.00,
    status: 'Paid',
    type: 'spiffs',
    accountNumber: 'VEL-5566',
    netBilled: 0.00,
    rate: 'Flat',
    commissionType: 'One-time'
  },
  {
    id: 'adj-101',
    cycle: '2025-03',
    customer: 'Allied Systems',
    provider: 'Comcast',
    product: 'Service Credit',
    amount: -150.00,
    status: 'Adjusted',
    type: 'adjustments',
    accountNumber: 'ALL-3344',
    adjustmentType: 'Service Credit'
  },
  {
    id: 'dis-101',
    cycle: '2025-03',
    customer: 'Summit Group',
    provider: 'Microsoft',
    product: 'SharePoint Services',
    amount: 800.50,  // Actual
    expectedCommission: 1250.75,
    paidCommission: 800.50,
    status: 'Disputed',
    type: 'disputes',
    accountNumber: 'SMT-7788',
    netBilled: 8200.00,
    ticketNumber: 'TK-2233',
    inquiryDate: '2025-03-05',
    closedDate: ''
  },
  {
    id: 'pen-101',
    cycle: '2025-03',
    customer: 'NexGen Technologies',
    provider: 'Adobe',
    product: 'Analytics Suite',
    amount: 895.50,
    status: 'Active',
    type: 'pending',
    orderNumber: 'ORD-45678',
    activatedDate: '2025-03-22',
    expectedCommissionDate: '2025-04-30'
  }
];
