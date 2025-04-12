
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export interface Ticket {
  id: string;
  ticketNumber: string;
  status: string;
  summary: string;
  customerAccount: string;
  accountNumber: string;
  orders: string;
  inquiryType: string;
  expectedCommission: number;
  created: string;
  latestNote: string;
}

interface TicketTableProps {
  tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  const isMobile = useIsMobile();

  const handleDownloadCSV = () => {
    if (tickets.length === 0) {
      toast.error("No data available to download");
      return;
    }

    // Create CSV content
    const headers = [
      "Ticket Number", 
      "Status", 
      "Summary", 
      "Customer Account", 
      "Account Number", 
      "Orders", 
      "Inquiry Type", 
      "Expected Commission", 
      "Created", 
      "Latest Note"
    ];
    
    const csvContent = [
      headers.join(','),
      ...tickets.map(ticket => [
        ticket.ticketNumber,
        ticket.status,
        `"${ticket.summary}"`,
        `"${ticket.customerAccount}"`,
        ticket.accountNumber,
        `"${ticket.orders}"`,
        ticket.inquiryType,
        ticket.expectedCommission.toFixed(2),
        ticket.created,
        `"${ticket.latestNote}"`
      ].join(','))
    ].join('\n');

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tickets.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadCSV}
          disabled={tickets.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Summary</TableHead>
              {!isMobile && <TableHead>Customer Account</TableHead>}
              {!isMobile && <TableHead>Account Number</TableHead>}
              {!isMobile && <TableHead>Orders</TableHead>}
              <TableHead>Inquiry Type</TableHead>
              <TableHead className="text-right">Expected Commission</TableHead>
              {!isMobile && <TableHead>Created</TableHead>}
              {!isMobile && <TableHead>Latest Note</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.ticketNumber}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(ticket.status)}`}>
                      {ticket.status}
                    </div>
                  </TableCell>
                  <TableCell>{ticket.summary}</TableCell>
                  {!isMobile && <TableCell>{ticket.customerAccount}</TableCell>}
                  {!isMobile && <TableCell>{ticket.accountNumber}</TableCell>}
                  {!isMobile && <TableCell>{ticket.orders}</TableCell>}
                  <TableCell>{ticket.inquiryType}</TableCell>
                  <TableCell className="text-right">${ticket.expectedCommission.toFixed(2)}</TableCell>
                  {!isMobile && <TableCell>{ticket.created}</TableCell>}
                  {!isMobile && <TableCell>{ticket.latestNote}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No tickets available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper function to get status badge styles
function getStatusStyles(status: string): string {
  switch (status.toLowerCase()) {
    case 'open':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    case 'disputed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default TicketTable;
