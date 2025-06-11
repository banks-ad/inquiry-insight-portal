
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Calendar } from 'lucide-react';
import CommissionsTable from '@/components/commissions/CommissionsTable';

const cycles = [
  { value: '2025-04', label: 'April 2025' },
  { value: '2025-03', label: 'March 2025' },
  { value: '2025-02', label: 'February 2025' },
  { value: '2025-01', label: 'January 2025' },
  { value: '2024-12', label: 'December 2024' },
  { value: '2024-11', label: 'November 2024' },
];

const PendingOrders = () => {
  const [selectedCycle, setSelectedCycle] = useState<string>(cycles[0].value);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Pending Orders</h1>
            <p className="text-muted-foreground">View orders that are pending commission payment</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Select value={selectedCycle} onValueChange={setSelectedCycle}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select cycle" />
              </SelectTrigger>
              <SelectContent>
                {cycles.map((cycle) => (
                  <SelectItem key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Pending items represent orders that have been provisioned and are awaiting their first commission payment.
          </AlertDescription>
        </Alert>

        <CommissionsTable type="pending" cycle={selectedCycle} />
      </div>
    </DashboardLayout>
  );
};

export default PendingOrders;
