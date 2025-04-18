
export interface CommissionsTableProps {
  type: 'commissions' | 'spiffs' | 'adjustments' | 'inquiries' | 'pending' | 'new-accounts' | 'lost-accounts' | 'account-variance';
  cycle: string;
}

export interface ProviderSummary {
  netBilled: number;
  grossCommission: number;
  accountCount: number;
}

export interface TableHeadersProps {
  type: CommissionsTableProps['type'];
  isMobile: boolean;
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
