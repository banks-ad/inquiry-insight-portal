
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
import { CustomerData } from '@/data/mockData';

interface TopCustomersChartProps {
  data: CustomerData[];
}

const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ data }) => {
  // Sort data by grossCommission in descending order
  const sortedData = [...data].sort((a, b) => b.grossCommission - a.grossCommission);
  
  // Take top 4 customers and group the rest as "Others"
  const topCustomers = sortedData.slice(0, 4);
  
  // Calculate the sum of commissions for all other customers
  const othersCommission = sortedData.slice(4).reduce(
    (sum, customer) => sum + customer.grossCommission, 
    0
  );
  
  // Create the chart data with the Others category
  const chartData = [
    ...topCustomers,
    ...(othersCommission > 0 ? [{ customer: "Others", grossCommission: othersCommission }] : [])
  ];
  
  return (
    <Paper shadow="xs" radius="md">
      <Box p="md" pb={8}>
        <Title order={5}>Top Customers</Title>
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
                dataKey="customer" 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Gross Commission']}
                labelFormatter={(label) => `Customer: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="grossCommission" 
                name="Gross Commission" 
                fill="#22c55e" 
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Paper>
  );
};

export default TopCustomersChart;
