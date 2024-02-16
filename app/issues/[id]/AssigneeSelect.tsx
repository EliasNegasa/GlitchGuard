'use client';

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
  });

  if (isLoading) <Skeleton />;

  if (error) <p>Error Occured</p>;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assignees" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assignee</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
