import { NextRequest, NextResponse } from 'next/server';

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(`Issues ${params.id}`);
}