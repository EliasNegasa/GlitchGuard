'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedUserId: userId === 'unassigned' ? null : userId,
      })
      .catch(() => toast.error('Changes could not be saved'));
  };

  if (isLoading) <Skeleton />;

  if (error) <p>Error Occured</p>;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assignees" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assignee</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
