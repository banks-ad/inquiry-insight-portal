
export interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'adjustments' | 'inquiries' | 'pending' | 'new-accounts' | 'lost-accounts' | 'account-variance';
  cycle: string;
  secondCycle?: string;
  cyclePair?: CyclePair;
}

export interface ProviderSummary {
  netBilled: number;
  grossCommission: number;
  accountCount: number;
}

export interface CyclePair {
  firstCycle: string;
  secondCycle: string;
}

export interface TableHeadersProps {
  type: CommissionsTableProps['type'];
  isMobile: boolean;
  cyclePair?: CyclePair;
}

export interface TableRowProps {
  row: any;
  type: CommissionsTableProps['type'];
  isMobile: boolean;
}

export interface DownloadButtonProps {
  onDownload: (format: string) => void;
  disabled: boolean;
}

export interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedProvider: string;
  onProviderChange: (value: string) => void;
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  type: CommissionsTableProps['type'];
  uniqueProviders: string[];
}

export interface CommissionEntry {
  id: string;
  cycle: string;
  provider: string;
  product?: string;
  accountNumber?: string;
  customer: string;
  netBilled?: number;
  amount: number;
  rate?: string;
  commissionType?: string;
  status?: string;
  inquiryDate?: string;
  closedDate?: string;
  orderNumber?: string;
  paidCommission?: number;
  expectedCommission?: number;
  ticketNumber?: string;
  type?: string;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
