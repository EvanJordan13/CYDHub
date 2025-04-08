// src/app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/src/lib/postgres/db';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (session?.user) {
    // Check if user exists in database
    const userEmail = session.user.email;
    let dbUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // Create user if they don't exist
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: userEmail,
          name: session.user.name || null,
          role: 'STUDENT', // Default role
          avatarUrl: session.user.picture || null,
          signupComplete: false,
          // Store Auth0 user ID if you have a field for it in your schema
        },
      });
    }

    return NextResponse.json({
      session,
      user: dbUser,
    });
  }

  return NextResponse.json({ session });
}
