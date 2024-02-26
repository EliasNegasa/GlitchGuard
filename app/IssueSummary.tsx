import { Flex, Card, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.value}>
          <Flex direction="column">
            <Link href={`/issues?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
