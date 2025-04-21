
import React from 'react';
import { Paper, Text, Group, ThemeIcon, Box } from '@mantine/core';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: number;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
  colorClass = "bg-blue-50 text-commission-blue"
}) => {
  // Extract the color for Mantine from the colorClass
  const getIconColor = () => {
    if (colorClass.includes('blue')) return 'blue';
    if (colorClass.includes('green')) return 'green';
    if (colorClass.includes('red')) return 'red';
    if (colorClass.includes('yellow')) return 'yellow';
    if (colorClass.includes('purple')) return 'violet';
    return 'blue';
  };

  return (
    <Paper shadow="xs" p="md" radius="md">
      <Group position="apart" align="flex-start">
        <Box>
          <Text size="sm" color="dimmed">{title}</Text>
          <Text size="xl" weight={700} mt={4}>{value}</Text>
          {description && (
            <Text size="sm" color="dimmed" mt={4}>{description}</Text>
          )}
          {trend !== undefined && (
            <Group spacing={4} mt={8}>
              <Text size="sm" color={trend >= 0 ? 'green' : 'red'}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </Text>
              <Text size="sm" color="dimmed">vs last month</Text>
            </Group>
          )}
        </Box>
        <ThemeIcon 
          size="lg" 
          radius="md" 
          color={getIconColor()} 
          variant="light"
        >
          <Icon size={20} />
        </ThemeIcon>
      </Group>
    </Paper>
  );
};

export default StatCard;
