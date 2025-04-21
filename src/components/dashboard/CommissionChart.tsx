
import React, { useState } from 'react';
import { Paper, Title, Box, Group, Menu, ActionIcon, Text } from '@mantine/core';
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
import { Filter, Check } from 'lucide-react';

interface ChartData {
  name: string;
  recurring: number;
  spiff: number;
  nonRecurring: number;
  adjustments: number;
}

interface CommissionChartProps {
  data: ChartData[];
}

const CommissionChart: React.FC<CommissionChartProps> = ({ data }) => {
  const [selectedTypes, setSelectedTypes] = useState({
    recurring: true,
    spiff: true,
    nonRecurring: true,
    adjustments: true
  });

  const handleTypeToggle = (type: keyof typeof selectedTypes) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <Paper shadow="xs" radius="md">
      <Box p="md" pb={8}>
        <Group position="apart" align="center">
          <Title order={5}>Commission Trends</Title>
          <Menu shadow="md" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light" color="blue" size="sm">
                <Group spacing={4}>
                  <Filter size={14} />
                  <Text size="xs">Filter</Text>
                </Group>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Commission Types</Menu.Label>
              <Menu.Divider />
              <Menu.Item 
                icon={selectedTypes.recurring ? <Check size={14} /> : <Box w={14} />}
                onClick={() => handleTypeToggle('recurring')}
              >
                Recurring
              </Menu.Item>
              <Menu.Item 
                icon={selectedTypes.spiff ? <Check size={14} /> : <Box w={14} />}
                onClick={() => handleTypeToggle('spiff')}
              >
                SPIFF
              </Menu.Item>
              <Menu.Item 
                icon={selectedTypes.nonRecurring ? <Check size={14} /> : <Box w={14} />}
                onClick={() => handleTypeToggle('nonRecurring')}
              >
                Non-Recurring
              </Menu.Item>
              <Menu.Item 
                icon={selectedTypes.adjustments ? <Check size={14} /> : <Box w={14} />}
                onClick={() => handleTypeToggle('adjustments')}
              >
                Adjustments
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
      <Box p="md" pt={0}>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Legend />
              {selectedTypes.recurring && (
                <Bar 
                  dataKey="recurring" 
                  name="Recurring" 
                  stackId="a" 
                  fill="#22c55e" 
                  radius={[4, 4, 0, 0]} 
                />
              )}
              {selectedTypes.spiff && (
                <Bar 
                  dataKey="spiff" 
                  name="SPIFF" 
                  stackId="a" 
                  fill="#9b87f5" 
                  radius={[4, 4, 0, 0]} 
                />
              )}
              {selectedTypes.nonRecurring && (
                <Bar 
                  dataKey="nonRecurring" 
                  name="Non-Recurring" 
                  stackId="a" 
                  fill="#F97316" 
                  radius={[4, 4, 0, 0]} 
                />
              )}
              {selectedTypes.adjustments && (
                <Bar 
                  dataKey="adjustments" 
                  name="Adjustments" 
                  stackId="a" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Paper>
  );
};

export default CommissionChart;
