import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import StatusBadge from '@/app/components/StatusBadge';
import Markdown from 'react-markdown';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  return (
    <div className="mx-10">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;