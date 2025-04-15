
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockForecastData } from '@/data/mockForecastData';

interface ForecastChartProps {
  months: number;
  churnRate: number;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ months, churnRate }) => {
  const data = mockForecastData.slice(0, months).map(item => ({
    ...item,
    expectedCommissions: item.expectedCommissions * (1 - churnRate / 100),
    pendingCommissions: item.pendingCommissions * (1 - churnRate / 100)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Forecast Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar
                dataKey="pendingCommissions"
                name="Pending Commissions"
                stackId="commissions"
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="expectedCommissions"
                name="Expected Commissions"
                stackId="commissions"
                fill="#3b82f6"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="paidCommissions"
                name="Paid Commissions"
                stackId="commissions"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
