
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ForecastChart from '@/components/forecast/ForecastChart';
import ForecastTable from '@/components/forecast/ForecastTable';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const CommissionForecast = () => {
  const [timeframe, setTimeframe] = React.useState('1');

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Commission Forecast</h1>
          <p className="text-muted-foreground">View expected commissions over time</p>
        </div>

        <Card className="p-4 mb-6">
          <RadioGroup
            defaultValue="1"
            onValueChange={setTimeframe}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="month1" />
              <Label htmlFor="month1">Next Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="month2" />
              <Label htmlFor="month2">2 Months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="month3" />
              <Label htmlFor="month3">3 Months</Label>
            </div>
          </RadioGroup>
        </Card>

        <div className="space-y-6">
          <ForecastChart months={Number(timeframe)} />
          <ForecastTable months={Number(timeframe)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommissionForecast;
