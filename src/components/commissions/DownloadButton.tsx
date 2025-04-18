
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DownloadButtonProps } from './types';

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload, disabled }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onDownload('summary')}>
          Commission Summary
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload('extended')}>
          Commissions (Extended)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload('rpm')}>
          RPM Formatted
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
