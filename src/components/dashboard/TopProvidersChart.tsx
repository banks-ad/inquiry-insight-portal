
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
  ResponsiveContainer 
} from 'recharts';
import { ProviderData } from '@/data/mockData';

interface TopProvidersChartProps {
  data: ProviderData[];
}

const TopProvidersChart: React.FC<TopProvidersChartProps> = ({ data }) => {
  // Sort data by grossCommission in descending order
  const sortedData = [...data].sort((a, b) => b.grossCommission - a.grossCommission);
  
  // Take top 4 providers and group the rest as "Others"
  const topProviders = sortedData.slice(0, 4);
  
  // Calculate the sum of commissions for all other providers
  const othersCommission = sortedData.slice(4).reduce(
    (sum, provider) => sum + provider.grossCommission, 
    0
  );
  
  // Create the chart data with the Others category
  const chartData = [
    ...topProviders,
    ...(othersCommission > 0 ? [{ provider: "Others", grossCommission: othersCommission }] : [])
  ];
  
  return (
    <Paper shadow="xs" radius="md">
      <Box p="md" pb={8}>
        <Title order={5}>Top Providers</Title>
      </Box>
      <Box p="md" pt={0}>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                tickFormatter={(value) => `$${value / 1000}k`} 
              />
              <YAxis 
                type="category" 
                dataKey="provider" 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Gross Commission']}
                labelFormatter={(label) => `Provider: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="grossCommission" 
                name="Gross Commission" 
                fill="#1E40AF" 
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Paper>
  );
};

export default TopProvidersChart;
