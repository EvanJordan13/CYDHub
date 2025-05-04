import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/postgres/db';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      signupComplete: user.signupComplete,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json({ error: 'Failed to fetch user status' }, { status: 500 });
  }
}
