import { StatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Container, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface Props {
  searchParams: {
    status: Status;
  };
}

const IssuePage = async ({ searchParams }: Props) => {
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
  });

  return (
    <Container>
      <IssueActions />

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
                <Link href={`/issues/${issue.id}`} className="hover:opacity-80">
                  {issue.title}
                </Link>
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
    </Container>
  );
};

export default IssuePage;
