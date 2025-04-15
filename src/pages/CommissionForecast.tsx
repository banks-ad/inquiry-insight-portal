
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ForecastChart from '@/components/forecast/ForecastChart';
import ForecastTable from '@/components/forecast/ForecastTable';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CommissionForecast = () => {
  const [timeframe, setTimeframe] = React.useState('1');
  const [churnRate, setChurnRate] = React.useState('0');

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Commission Forecast</h1>
          <p className="text-muted-foreground">View expected commissions over time</p>
        </div>

        <Card className="p-4 mb-6 space-y-6">
          <div>
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="churn">Include Churn</Label>
              <Select value={churnRate} onValueChange={setChurnRate}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Including possible churn of existing accounts that are renewing soon
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <ForecastChart months={Number(timeframe)} churnRate={Number(churnRate)} />
          <ForecastTable months={Number(timeframe)} churnRate={Number(churnRate)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommissionForecast;

