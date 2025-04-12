
export interface ProviderSummary {
  id: string;
  provider: string;
  months: {
    [key: string]: number;
  };
  totalCommission: number;
}

// List of providers for the summary
const providers = [
  'Lumen', 'Comcast', 'Spectrum', 'Microsoft', 'Adobe', 'AWS', 'Google Cloud', 'IBM Cloud',
  'Verizon', 'AT&T', 'CenturyLink', 'Oracle', 'Salesforce', 'Zoom', 'RingCentral', 'Vonage',
  'Dell', 'HPE', 'Cisco', 'Juniper', 'Fortinet', 'Palo Alto Networks', 'VMware', 'Splunk', 'ServiceNow'
];

// Months for the summary (last 6 months)
export const summaryMonths = [
  '2025-04', '2025-03', '2025-02', '2025-01', '2024-12', '2024-11'
];

// Helper function to generate random commission amounts
const generateRandomAmount = (min: number, max: number): number => {
  return parseFloat((min + Math.random() * (max - min)).toFixed(2));
};

// Generate mock provider summary data
export const mockProviderSummaryData: ProviderSummary[] = providers.map((provider, index) => {
  const monthData: { [key: string]: number } = {};
  let total = 0;
  
  // Generate data for each month
  summaryMonths.forEach(month => {
    // Base amount varies by provider "tier"
    const baseAmount = provider === 'Lumen' || provider === 'Comcast' || provider === 'Microsoft'
      ? generateRandomAmount(15000, 25000)  // Tier 1 providers
      : provider === 'Verizon' || provider === 'AT&T' || provider === 'AWS' || provider === 'Salesforce'
        ? generateRandomAmount(8000, 15000) // Tier 2 providers
        : generateRandomAmount(2000, 8000); // Tier 3 providers
    
    // Add some randomness for month-to-month variation
    const monthlyVariation = (Math.random() * 0.3) - 0.15; // -15% to +15% variation
    const amount = baseAmount * (1 + monthlyVariation);
    
    monthData[month] = parseFloat(amount.toFixed(2));
    total += amount;
  });
  
  return {
    id: `provider-${index + 1}`,
    provider,
    months: monthData,
    totalCommission: parseFloat(total.toFixed(2))
  };
}).sort((a, b) => b.totalCommission - a.totalCommission); // Sort by total commission descending
