import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/src/lib/postgres/db';
import { UserRole } from '@prisma/client';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (session?.user) {
    const auth0Sub = session.user.sub;
    const userEmail = session.user.email;
    const userName = session.user.name;
    const userPicture = session.user.picture;

    if (!auth0Sub) {
      console.error('Auth0 session is missing user subject (sub).');
      return NextResponse.json({ error: 'Authentication error: Missing user ID.' }, { status: 500 });
    }
    if (!userEmail) {
      console.error('Auth0 session is missing user email.');
      return NextResponse.json({ error: 'Authentication error: Missing user email.' }, { status: 500 });
    }

    try {
      // Find user by ID
      let dbUser = await prisma.user.findUnique({
        where: { auth0Id: auth0Sub },
      });

      // If couldn't find by ID, try email
      if (!dbUser && userEmail) {
        dbUser = await prisma.user.findUnique({
          where: { email: userEmail },
        });

        // If found by email, update their auth0Id if it's missing
        if (dbUser && !dbUser.auth0Id) {
          dbUser = await prisma.user.update({
            where: { id: dbUser.id },
            data: { auth0Id: auth0Sub },
          });
        }
      }

      // If still not found, create a new user
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: userEmail,
            auth0Id: auth0Sub,
            name: userName || null,
            role: UserRole.STUDENT, // Default for now
            avatarUrl: userPicture || null,
            signupComplete: false, // User needs onboarding
          },
        });
      }

      // Return the Auth0 session AND the corresponding database user record
      return NextResponse.json(
        {
          session,
          dbUser: dbUser,
        },
        { headers: res.headers },
      );
    } catch (error) {
      console.error('Error finding or creating user in DB:', error);
      return NextResponse.json({ error: 'Database operation failed.' }, { status: 500 });
    }
  }

  // No active session
  return NextResponse.json({ session: null, dbUser: null }, { headers: res.headers });
}
