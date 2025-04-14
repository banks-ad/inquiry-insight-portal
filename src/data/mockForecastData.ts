
export interface ForecastData {
  month: string;
  paidCommissions: number;
  expectedCommissions: number;
  pendingCommissions: number;
}

export const mockForecastData: ForecastData[] = [
  {
    month: 'Apr 2025',
    paidCommissions: 85000,
    expectedCommissions: 45000,
    pendingCommissions: 25000,
  },
  {
    month: 'May 2025',
    paidCommissions: 92000,
    expectedCommissions: 52000,
    pendingCommissions: 28000,
  },
  {
    month: 'Jun 2025',
    paidCommissions: 88000,
    expectedCommissions: 48000,
    pendingCommissions: 32000,
  }
];
