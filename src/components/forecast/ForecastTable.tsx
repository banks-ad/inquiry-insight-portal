
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockForecastData } from "@/data/mockForecastData";

interface ForecastTableProps {
  months: number;
  churnRate: number;
}

const ForecastTable: React.FC<ForecastTableProps> = ({ months, churnRate }) => {
  const data = mockForecastData.slice(0, months).map(item => ({
    ...item,
    pendingCommissions: item.pendingCommissions * (1 - churnRate / 100)
  }));

  const totals = data.reduce((acc, curr) => ({
    paidCommissions: acc.paidCommissions + curr.paidCommissions,
    pendingCommissions: acc.pendingCommissions + curr.pendingCommissions,
  }), {
    paidCommissions: 0,
    pendingCommissions: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Forecast Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Paid Commissions</TableHead>
              <TableHead className="text-right">Pending Commissions</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const total = row.paidCommissions + row.pendingCommissions;
              return (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell className="text-right">${row.paidCommissions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${row.pendingCommissions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${total.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
            <TableRow className="font-medium">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">${totals.paidCommissions.toLocaleString()}</TableCell>
              <TableCell className="text-right">${totals.pendingCommissions.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                ${(totals.paidCommissions + totals.pendingCommissions).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ForecastTable;
