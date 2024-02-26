import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import { StatusBadge } from './components';

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedUser: true },
  });

  return (
    <Card>
      <Heading size="3" mb="2" ml="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    {issue.title}
                    <StatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser.image!}
                      fallback="?"
                      radius="full"
                      size="2"
                    />
                  )}
                </Flex>
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
