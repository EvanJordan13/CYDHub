import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/postgres/db';
import { getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { email, programId } = await req.json();

    // Get the user who is creating the invitation
    const inviter = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!inviter) {
      return NextResponse.json({ error: 'Inviter not found' }, { status: 404 });
    }

    // Create a unique token
    const token = uuidv4();

    // Create the invitation
    const invitation = await prisma.invitation.create({
      data: {
        email,
        token,
        status: 'PENDING',
        program: { connect: { id: programId } },
        invitedBy: { connect: { id: inviter.id } },
      },
    });

    // Here you would typically send an email with the invitation link
    // For example: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${token}`

    return NextResponse.json({ invitation });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}
