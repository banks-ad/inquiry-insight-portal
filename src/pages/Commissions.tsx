import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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

const Commissions = () => {
  const [activeTab, setActiveTab] = useState<string>("commissions");
  const [selectedCycle, setSelectedCycle] = useState<string>(cycles[0].value);
  const [secondCycle, setSecondCycle] = useState<string>(cycles[1].value);

  const isCurrentMonth = selectedCycle === cycles[0].value;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Commissions</h1>
            <p className="text-muted-foreground">View and manage your commission data</p>
          </div>
          
          {activeTab !== 'account-variance' && (
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
          )}
        </div>

        {isCurrentMonth && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              You are viewing preview data for the current commission cycle. Numbers shown here may change until the cycle has closed.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="commissions" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="new-accounts">New Accounts</TabsTrigger>
            <TabsTrigger value="lost-accounts">Lost Accounts</TabsTrigger>
            <TabsTrigger value="account-variance">Account Variance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="commissions">
            <CommissionsTable type="commissions" cycle={selectedCycle} />
          </TabsContent>
          
          <TabsContent value="inquiries">
            <CommissionsTable type="inquiries" cycle={selectedCycle} />
          </TabsContent>
          
          <TabsContent value="new-accounts">
            <CommissionsTable type="new-accounts" cycle={selectedCycle} />
          </TabsContent>

          <TabsContent value="lost-accounts">
            <CommissionsTable type="lost-accounts" cycle={selectedCycle} />
          </TabsContent>

          <TabsContent value="account-variance">
            {activeTab === 'account-variance' && (
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">
                  Select two commission cycles below to compare their performance and view the variance between them.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Cycle</label>
                    <Select value={selectedCycle} onValueChange={setSelectedCycle}>
                      <SelectTrigger className="w-[180px]">
                        <Calendar className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="First cycle" />
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
                  <div>
                    <label className="text-sm font-medium mb-2 block">Second Cycle</label>
                    <Select value={secondCycle} onValueChange={setSecondCycle}>
                      <SelectTrigger className="w-[180px]">
                        <Calendar className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Second cycle" />
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
              </div>
            )}
            <CommissionsTable 
              type="account-variance" 
              cycle={selectedCycle} 
              secondCycle={secondCycle}
              cyclePair={{
                firstCycle: cycles.find(c => c.value === selectedCycle)?.label || selectedCycle,
                secondCycle: cycles.find(c => c.value === secondCycle)?.label || secondCycle
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Commissions;
