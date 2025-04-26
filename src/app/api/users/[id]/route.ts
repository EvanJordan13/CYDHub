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
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = parseInt(params.id);

  // Check if this is the user's own record
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.email !== session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const userData = await req.json();

    // Update the user record
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
