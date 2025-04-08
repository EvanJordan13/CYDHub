// src/app/api/invitations/accept/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/src/lib/postgres/db';

export async function POST(req: NextRequest) {
  const session = await getSession(req, new NextResponse());

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { token } = await req.json();

    // Find the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { program: true },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invalid invitation' }, { status: 404 });
    }

    if (invitation.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invitation already used' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Accept the invitation
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    // Enroll the user in the program
    await prisma.programUser.create({
      data: {
        userId: user.id,
        programId: invitation.programId,
        role: 'STUDENT', // Or any role you want to set
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return NextResponse.json({ error: 'Failed to accept invitation' }, { status: 500 });
  }
}
