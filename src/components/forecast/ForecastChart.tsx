
import React from 'react';
import { Paper, Title, Box } from '@mantine/core';
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
    pendingCommissions: item.pendingCommissions * (1 - churnRate / 100)
  }));

  return (
    <Paper shadow="xs" radius="md">
      <Box p="md" pb={8}>
        <Title order={5}>Commission Forecast Chart</Title>
      </Box>
      <Box p="md" pt={0}>
        <div style={{ height: 400 }}>
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
                dataKey="paidCommissions"
                name="Paid Commissions"
                stackId="commissions"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Paper>
  );
};

export default ForecastChart;
