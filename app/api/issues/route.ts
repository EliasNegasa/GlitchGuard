import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../issueSchema';
import { authOptions } from '../auth/authOptions';

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, assignedUserId } = body;

  if (assignedUserId) {
    const user = prisma.user.findUnique({ where: { id: assignedUserId } });
    if (!user) return NextResponse.json('Invalid User');
  }

  const newIssue = await prisma.issue.create({
    data: { title, description, assignedUserId },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
