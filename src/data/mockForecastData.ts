
export interface ForecastData {
  month: string;
  paidCommissions: number;
  pendingCommissions: number;
}

export const mockForecastData: ForecastData[] = [
  {
    month: 'Apr 2025',
    paidCommissions: 85000,
    pendingCommissions: 25000,
  },
  {
    month: 'May 2025',
    paidCommissions: 92000,
    pendingCommissions: 28000,
  },
  {
    month: 'Jun 2025',
    paidCommissions: 88000,
    pendingCommissions: 32000,
  }
];
