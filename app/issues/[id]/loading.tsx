import { Skeleton } from '@/app/components';
import { Card, Flex } from '@radix-ui/themes';

const LoadingIssueDetails = () => {
  return (
    <div className="mx-10 max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetails;
