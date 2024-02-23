'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const issueFilter = (status: string) => {
    const params = new URLSearchParams();

    if (status && status !== 'all') params.append('status', status);

    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);

    const query = params;
    router.push('/issues/?' + query);
  };

  return (
    <Select.Root
      defaultValue={
        searchParams.get('status') ? searchParams.get('status')! : 'all'
      }
      onValueChange={issueFilter}
    >
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
