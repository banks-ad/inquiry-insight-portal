
import { CommissionEntry, ProviderSummary } from '../types';

export const generateSummaryData = (filteredData: CommissionEntry[], cycle: string) => {
  const providerSummary = filteredData.reduce((acc: Record<string, ProviderSummary>, row) => {
    const provider = row.provider;
    if (!acc[provider]) {
      acc[provider] = { 
        netBilled: 0, 
        grossCommission: 0,
        accountCount: 0
      };
    }
    acc[provider].netBilled += (row.netBilled || 0);
    acc[provider].grossCommission += row.amount;
    acc[provider].accountCount += 1;
    return acc;
  }, {});

  return Object.entries(providerSummary).map(([provider, data]) => [
    cycle,
    `"${provider}"`,
    data.netBilled.toFixed(2),
    data.grossCommission.toFixed(2),
    data.accountCount.toString()
  ]);
};

export const generateExtendedData = (filteredData: CommissionEntry[]) => {
  return filteredData.map(row => [
    row.cycle,
    `"${row.provider}"`,
    `"${row.product}"`,
    row.accountNumber || '',
    `"${row.customer}"`,
    (row.netBilled || 0).toFixed(2),
    row.amount.toFixed(2),
    row.rate || '',
    row.commissionType || '',
    row.status || 'Paid',
    row.inquiryDate || '2025-01-01',
    row.closedDate || '2025-01-15',
    row.orderNumber || ''
  ]);
};

export const generateRpmData = (filteredData: CommissionEntry[]) => {
  return filteredData.map((row, index) => [
    `RPM-${row.cycle}-${index + 1000}`,
    row.cycle,
    `"${row.provider}"`,
    row.accountNumber || '',
    `"${row.customer}"`,
    (row.netBilled || 0).toFixed(2),
    row.amount.toFixed(2),
    row.commissionType || '',
    row.inquiryDate || '2025-01-01'
  ]);
};

export const generateStandardData = (filteredData: CommissionEntry[], type: string) => {
  return filteredData.map(row => {
    if (type === 'commissions' || type === 'spiffs') {
      return [
        row.cycle,
        `"${row.provider}"`,
        `"${row.product}"`,
        row.accountNumber || '',
        `"${row.customer}"`,
        (row.netBilled || 0).toFixed(2),
        row.amount.toFixed(2),
        row.rate || '',
        row.commissionType || type
      ];
    }
    // Add other type configurations here
    return [];
  });
};

