
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { CommissionsTableProps } from './types';
import { CommissionsTableHeaders } from './CommissionsTableHeaders';
import { CommissionsTableRow } from './CommissionsTableRow';
import { CommissionsTableFooter } from './CommissionsTableFooter';
import { DownloadButton } from './DownloadButton';
import { FilterBar } from './FilterBar';
import { mockCommissionsData, newAccountsData, lostAccountsData, accountVarianceData } from '@/data/mockData';
import { filterCommissionsData } from './table-utils/filtering';
import { calculateTotals } from './table-utils/totals';
import { generateSummaryData, generateExtendedData, generateRpmData, generateStandardData } from './table-utils/download-helpers';
import { TablePagination } from './TablePagination';

const ITEMS_PER_PAGE = 10;

const CommissionsTable: React.FC<CommissionsTableProps> = ({ type, cycle }) => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Recurring', 'Non-recurring', 'SPIFF', 'Adjustment']);
  
  const uniqueProviders = Array.from(
    new Set(mockCommissionsData.map(item => item.provider))
  ).sort();

  const filteredData = React.useMemo(() => {
    let data = type === 'new-accounts' 
      ? [...newAccountsData]
      : type === 'lost-accounts'
      ? [...lostAccountsData]
      : type === 'account-variance'
      ? [...accountVarianceData]
      : [...mockCommissionsData];

    return filterCommissionsData(data, type, cycle, searchTerm, selectedProvider, selectedTypes);
  }, [type, cycle, searchTerm, selectedProvider, selectedTypes]);

  const { totalNetBilled, totalGrossCommission } = calculateTotals(filteredData);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProvider, type, cycle]);

  const handleDownloadCSV = (format: string = 'summary') => {
    if (filteredData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    let headers: string[] = [];
    let filename = `${type}-${cycle}`;
    let values: string[][] = [];
    
    if (format === 'summary') {
      headers = ["Cycle", "Provider", "Total Net Billed", "Total Gross Commission", "Number of Accounts"];
      values = generateSummaryData(filteredData, cycle);
      filename = `commission-summary-${cycle}`;
    } else if (format === 'extended') {
      headers = [
        "Cycle", "Provider", "Product", "Account Number", "Customer", 
        "Net Billed", "Gross Commission", "Rate", "Type", "Status", 
        "Created Date", "Last Updated", "Order Number"
      ];
      values = generateExtendedData(filteredData);
      filename = `commissions-extended-${cycle}`;
    } else if (format === 'rpm') {
      headers = [
        "RPM ID", "Cycle", "Provider", "Account Number", "Customer", 
        "Net Billed", "Gross Commission", "Type", "Order Date"
      ];
      values = generateRpmData(filteredData);
      filename = `rpm-export-${cycle}`;
    } else {
      if (type === 'commissions' || type === 'spiffs') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
      } else if (type === 'inquiries') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", 
                   "Paid Commission", "Expected Commission", "Actual Commission", "Inquiry Status", 
                   "Ticket Number", "Inquiry Date", "Closed Date"];
      } else if (type === 'pending') {
        headers = ["Customer", "Provider", "Product", "Order Number", "Status", 
                   "Activated Date", "Expected Commission Date"];
      } else if (type === 'adjustments') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Amount", "Adjustment Type", "Status"];
      } else if (type === 'new-accounts') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
      } else if (type === 'lost-accounts') {
        headers = ["Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type"];
      } else if (type === 'account-variance') {
        headers = ["Current Cycle", "Provider", "Product", "Account Number", "Customer", "Net Billed", "Gross Commission", "Rate", "Type", "Variance vs. Last Month", "Variance vs. 2 Months Ago", "Variance vs. 3 Months Ago"];
      }
      values = generateStandardData(filteredData, type);
    }

    const csvRows = values.map(row => row.join(','));
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${format.charAt(0).toUpperCase() + format.slice(1)} download started`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          type={type}
          uniqueProviders={uniqueProviders}
        />
        
        <div className="flex justify-end">
          <DownloadButton
            onDownload={handleDownloadCSV}
            disabled={filteredData.length === 0}
          />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <CommissionsTableHeaders type={type} isMobile={isMobile} />
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <CommissionsTableRow
                  key={row.id}
                  row={row}
                  type={type}
                  isMobile={isMobile}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No data available for this selection
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <CommissionsTableFooter
            type={type}
            totalNetBilled={totalNetBilled}
            totalGrossCommission={totalGrossCommission}
            isMobile={isMobile}
            showTotals={filteredData.length > 0}
          />
        </Table>
      </div>
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CommissionsTable;
