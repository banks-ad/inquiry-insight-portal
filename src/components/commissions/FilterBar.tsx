
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FilterBarProps } from './types';

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedProvider,
  onProviderChange,
  selectedTypes,
  onTypesChange,
  type,
  uniqueProviders,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:w-2/3">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="w-full sm:w-64">
        <Select value={selectedProvider} onValueChange={onProviderChange}>
          <SelectTrigger>
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            {uniqueProviders.map((provider) => (
              <SelectItem key={provider} value={provider}>
                {provider}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {type === 'commissions' && (
        <div className="flex flex-wrap gap-2">
          {['Recurring', 'Non-recurring', 'SPIFF', 'Adjustment'].map((commType) => (
            <Button
              key={commType}
              variant={selectedTypes.includes(commType) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onTypesChange(
                  selectedTypes.includes(commType)
                    ? selectedTypes.filter(t => t !== commType)
                    : [...selectedTypes, commType]
                );
              }}
            >
              {commType}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
