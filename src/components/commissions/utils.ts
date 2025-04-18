
export const getStatusStyles = (status: string): string => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Disputed':
      return 'bg-red-100 text-red-800';
    case 'Approved':
      return 'bg-blue-100 text-blue-800';
    case 'Adjusted':
      return 'bg-purple-100 text-purple-800';
    case 'Active':
      return 'bg-blue-100 text-blue-800';
    case 'Provisioning':
      return 'bg-indigo-100 text-indigo-800';
    case 'Submitted':
      return 'bg-amber-100 text-amber-800';
    case 'Open':
      return 'bg-orange-100 text-orange-800';
    case 'Closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const generateCSVHeaders = (type: string) => {
  if (type === 'commissions' || type === 'spiffs') {
    return ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
  } else if (type === 'inquiries') {
    return ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", 
            "Paid Commission", "Expected Commission", "Actual Commission", "Inquiry Status", 
            "Ticket Number", "Inquiry Date", "Closed Date"];
  }
  // ... add other header configurations
  return [];
};

export const formatDataForCSV = (row: any, type: string) => {
  if (type === 'commissions' || type === 'spiffs') {
    return [
      row.cycle,
      `"${row.provider}"`,
      `"${row.product}"`,
      row.accountNumber || '',
      `"${row.customer}"`,
      (row.netBilled || 0).toFixed(2),
      row.amount.toFixed(2),
      row.rate || '',
      row.commissionType || type
    ];
  }
  // ... add other data formatting configurations
  return [];
};
