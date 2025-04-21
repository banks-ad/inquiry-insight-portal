
import React from 'react';
import { Table, Paper, Text, Group, Badge, Box, Anchor } from '@mantine/core';
import { DollarSign } from 'lucide-react';

export interface Inquiry {
  id: string;
  client: string;
  agent: string;
  amount: number;
  date: string;
  status: 'open' | 'closed';
  recoveredAmount?: number;
}

interface InquiryTableProps {
  inquiries: Inquiry[];
  title: string;
}

const InquiryTable: React.FC<InquiryTableProps> = ({ inquiries, title }) => {
  return (
    <Box mb="md">
      <Group position="apart" mb="sm">
        <Text size="lg" weight={500}>{title}</Text>
        <Anchor size="sm" component="button">View all</Anchor>
      </Group>
      <Paper shadow="xs" radius="md">
        <Table striped>
          <thead>
            <tr>
              <th>Client</th>
              <th>Agent</th>
              <th>Amount</th>
              <th>Recovered</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>
                  <Text weight={500}>{inquiry.client}</Text>
                </td>
                <td>{inquiry.agent}</td>
                <td>${inquiry.amount.toLocaleString()}</td>
                <td>
                  {inquiry.status === 'closed' ? (
                    <Group spacing={4}>
                      <DollarSign size={16} color="#22c55e" />
                      <Text color="green">{(inquiry.recoveredAmount || inquiry.amount).toLocaleString()}</Text>
                    </Group>
                  ) : (
                    "—"
                  )}
                </td>
                <td>{inquiry.date}</td>
                <td>
                  <Badge 
                    color={inquiry.status === 'open' ? 'blue' : 'green'}
                    variant="light"
                  >
                    {inquiry.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Box>
  );
};

export default InquiryTable;
