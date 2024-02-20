import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(255),
  description: z.string().min(1, 'Description is Required'),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(255).optional(),
  description: z.string().min(1, 'Description is Required').optional(),
  assignedUserId: z.string().min(1).optional().nullable(),
});
