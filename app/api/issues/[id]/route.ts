import { patchIssueSchema } from '@/app/issueSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authOptions';

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(`Issues ${params.id}`);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, assignedUserId } = body;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) return NextResponse.json('Invalid User', { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return NextResponse.json('Issue Not Found', { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      assignedUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return NextResponse.json('Issue Not Found', { status: 404 });

  await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
