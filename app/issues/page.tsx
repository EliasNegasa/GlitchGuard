import { Button, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import prisma from '@/prisma/client';
import StatusBadge from '../components/StatusBadge';

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="mx-10">
      <div className="mb-4">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created at
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                {issue.title}
                <Text className="block md:hidden text-sm">
                  <StatusBadge status={issue.status} />
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
