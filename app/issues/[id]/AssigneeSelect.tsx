'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assignee</Select.Label>
          <Select.Item value="1">Elias</Select.Item>
          <Select.Item value="2">Ng</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
