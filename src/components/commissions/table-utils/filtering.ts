
import { CommissionEntry } from '../types';

export const filterCommissionsData = (
  data: CommissionEntry[],
  type: string,
  cycle: string,
  searchTerm: string,
  selectedProvider: string,
  selectedTypes: string[]
) => {
  return data.filter((item) => {
    // For pending, we don't need to match by cycle as they're not cycle-specific
    const matchesCycle = type === 'pending' ? true : item.cycle === cycle;
    
    const matchesSearch = searchTerm === '' || 
      Object.values(item).some(
        value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesProvider = selectedProvider === 'all' || item.provider === selectedProvider;
    const matchesType = type === 'commissions' ? selectedTypes.includes(item.commissionType || '') : true;
    
    if (type === 'new-accounts' || type === 'lost-accounts' || type === 'account-variance') {
      return matchesCycle && matchesSearch && matchesProvider;
    }
    
    const dataType = type === 'inquiries' 
      ? 'disputes' 
      : type === 'pending'
      ? 'pending'
      : type;
      
    return item.type === dataType && matchesCycle && matchesSearch && matchesProvider && matchesType;
  });
};
