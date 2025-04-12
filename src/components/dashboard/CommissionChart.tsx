
import React, { useState } from 'react';
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
import { Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChartData {
  name: string;
  spiff: number;
  nonRecurring: number;
  adjustments: number;
}

interface CommissionChartProps {
  data: ChartData[];
}

const CommissionChart: React.FC<CommissionChartProps> = ({ data }) => {
  const [selectedTypes, setSelectedTypes] = useState({
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

  const selectedTypesCount = Object.values(selectedTypes).filter(Boolean).length;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Commission Trends</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Commission Types</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedTypes.spiff}
              onCheckedChange={() => handleTypeToggle('spiff')}
            >
              SPIFF
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.nonRecurring}
              onCheckedChange={() => handleTypeToggle('nonRecurring')}
            >
              Non-Recurring
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.adjustments}
              onCheckedChange={() => handleTypeToggle('adjustments')}
            >
              Adjustments
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
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
                  fill="#22c55e" 
                  radius={[4, 4, 0, 0]} 
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionChart;
