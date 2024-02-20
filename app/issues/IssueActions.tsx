import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueFilter from './IssueFilter';

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueFilter />
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
