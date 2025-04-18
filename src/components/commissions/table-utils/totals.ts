
import { CommissionEntry } from '../types';

export const calculateTotals = (filteredData: CommissionEntry[]) => {
  const totalNetBilled = filteredData.reduce((sum, item) => sum + (item.netBilled || 0), 0);
  const totalGrossCommission = filteredData.reduce((sum, item) => sum + item.amount, 0);
  
  return {
    totalNetBilled,
    totalGrossCommission
  };
};

