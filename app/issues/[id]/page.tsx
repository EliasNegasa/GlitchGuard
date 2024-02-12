import StatusBadge from '@/app/components/StatusBadge';
import prisma from '@/prisma/client';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import DeleteIssueButton from './DeleteIssueButton';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  return (
    <div className="mx-10 max-w-xl">
      <Flex justify="between">
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-2">
          <Link href={`/issues/${issue.id}/edit`}>
            <Button>
              <Pencil2Icon />
              Edit
            </Button>
          </Link>
          <DeleteIssueButton />
        </Flex>
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

export default IssueDetailsPage;
