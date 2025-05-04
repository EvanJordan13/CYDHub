import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/src/lib/postgres/db';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name: session.user.name || null,
          role: 'STUDENT',
          signupComplete: false,
          auth0Id: session.user.sub,
          avatarUrl: session.user.picture || null,
        },
      });

      return NextResponse.json(newUser);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error looking up user:', error);
    return NextResponse.json({ error: 'Failed to look up user' }, { status: 500 });
  }
}
