
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
  ResponsiveContainer 
} from 'recharts';

interface ProviderData {
  provider: string;
  grossCommission: number;
}

interface TopProvidersChartProps {
  data: ProviderData[];
}

const TopProvidersChart: React.FC<TopProvidersChartProps> = ({ data }) => {
  // Sort data by grossCommission in descending order
  const sortedData = [...data].sort((a, b) => b.grossCommission - a.grossCommission);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Providers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
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
      </CardContent>
    </Card>
  );
};

export default TopProvidersChart;
