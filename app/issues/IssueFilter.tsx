'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueFilter = () => {
  const router = useRouter();

  const issueFilter = (status: string) => {
    const query = status !== 'all' ? `status=${status}` : '';
    router.push('/issues/?' + query);
  };

  return (
    <Select.Root defaultValue="all" onValueChange={issueFilter}>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
