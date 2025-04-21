
import React from 'react';
import { Paper, Title, Box, Table, Text } from '@mantine/core';
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
    <Paper shadow="xs" radius="md">
      <Box p="md" pb={8}>
        <Title order={5}>Commission Forecast Table</Title>
      </Box>
      <Box p="md" pt={0}>
        <Table>
          <thead>
            <tr>
              <th>Month</th>
              <th style={{ textAlign: 'right' }}>Paid Commissions</th>
              <th style={{ textAlign: 'right' }}>Pending Commissions</th>
              <th style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const total = row.paidCommissions + row.pendingCommissions;
              return (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td style={{ textAlign: 'right' }}>${row.paidCommissions.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>${row.pendingCommissions.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Text weight={500}>${total.toLocaleString()}</Text>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <Text weight={500}>Total</Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text weight={500}>${totals.paidCommissions.toLocaleString()}</Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text weight={500}>${totals.pendingCommissions.toLocaleString()}</Text>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Text weight={500}>${(totals.paidCommissions + totals.pendingCommissions).toLocaleString()}</Text>
              </td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </Paper>
  );
};

export default ForecastTable;
