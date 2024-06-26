import { authOptions } from '@/app/api/auth/authOptions';
import StatusBadge from '@/app/components/StatusBadge';
import prisma from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) return notFound();

  return (
    <div className="mx-10 max-w-xl">
      <Flex justify="between">
        <Heading>{issue.title}</Heading>
        {session && (
          <Flex className="space-x-2">
            <AssigneeSelect issue={issue} />
            <Link href={`/issues/${issue.id}/edit`}>
              <Button>
                <Pencil2Icon />
                Edit
              </Button>
            </Link>
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Flex>
      <Flex gap="3" my="2">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetailsPage;
