import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/postgres/db';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest) {
  const res = new NextResponse();

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const userData = await req.json();
    const newUser = await prisma.user.create({
      data: userData,
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
