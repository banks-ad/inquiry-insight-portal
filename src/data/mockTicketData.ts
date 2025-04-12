
import { Ticket } from '@/components/inquiries/TicketTable';

export const mockTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TK-4567',
    status: 'Open',
    summary: 'Missing commission for SD-WAN installation',
    customerAccount: 'Green Energy Co',
    accountNumber: 'GRN-2345',
    orders: 'ORD-78901',
    inquiryType: 'Missing Commission',
    expectedCommission: 1850.00,
    created: '2025-04-03',
    latestNote: 'Contacted provider to verify service installation date.'
  },
  {
    id: '2',
    ticketNumber: 'TK-5678',
    status: 'In Progress',
    summary: 'Partial commission received',
    customerAccount: 'Omega Manufacturing',
    accountNumber: 'OMG-6789',
    orders: 'ORD-89012',
    inquiryType: 'Partial Commission',
    expectedCommission: 675.50,
    created: '2025-04-11',
    latestNote: 'Provider confirmed incorrect commission rate was applied.'
  },
  {
    id: '3',
    ticketNumber: 'TK-6789',
    status: 'Open',
    summary: 'New solution setup missing spiff',
    customerAccount: 'Atlas Consulting',
    accountNumber: 'ATL-9012',
    orders: 'ORD-90123',
    inquiryType: 'Missing Spiff',
    expectedCommission: 500.00,
    created: '2025-04-15',
    latestNote: 'Submitted documentation for new solution promotion qualification.'
  },
  {
    id: '4',
    ticketNumber: 'TK-7890',
    status: 'Resolved',
    summary: 'Commission rate discrepancy',
    customerAccount: 'Horizon Media',
    accountNumber: 'HRZ-3456',
    orders: 'ORD-01234',
    inquiryType: 'Rate Discrepancy',
    expectedCommission: 1200.75,
    created: '2025-04-08',
    latestNote: 'Provider adjusted rate and issued correction.'
  },
  {
    id: '5',
    ticketNumber: 'TK-8901',
    status: 'Closed',
    summary: 'Missing commission for added licenses',
    customerAccount: 'Vertex Solutions',
    accountNumber: 'VTX-7890',
    orders: 'ORD-12345',
    inquiryType: 'Missing Commission',
    expectedCommission: 350.25,
    created: '2025-04-02',
    latestNote: 'Issue resolved - commission will appear in next cycle.'
  },
  {
    id: '6',
    ticketNumber: 'TK-9012',
    status: 'Pending',
    summary: 'SPIFF not applied for contract renewal',
    customerAccount: 'Pioneer Electronics',
    accountNumber: 'PNR-1234',
    orders: 'ORD-23456',
    inquiryType: 'Missing Spiff',
    expectedCommission: 750.00,
    created: '2025-04-17',
    latestNote: 'Waiting for provider confirmation on promotion eligibility.'
  },
  {
    id: '7',
    ticketNumber: 'TK-0123',
    status: 'Open',
    summary: 'Incorrect billing tier applied',
    customerAccount: 'Quantum Research',
    accountNumber: 'QTM-5678',
    orders: 'ORD-34567',
    inquiryType: 'Rate Discrepancy',
    expectedCommission: 980.50,
    created: '2025-04-19',
    latestNote: 'Submitted evidence of correct tier qualification.'
  },
  {
    id: '8',
    ticketNumber: 'TK-2233',
    status: 'Disputed',
    summary: 'SharePoint service commission discrepancy',
    customerAccount: 'Summit Group',
    accountNumber: 'SMT-7788',
    orders: 'ORD-45678',
    inquiryType: 'Partial Commission',
    expectedCommission: 1250.75,
    created: '2025-03-05',
    latestNote: 'Provider claims different tier qualification. Escalated to management.'
  }
];
