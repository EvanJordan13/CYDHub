import prisma from "@/src/lib/postgres/db";
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { userId: number } }) {
  const userId = params.userId;
  try {
    const programs = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        programEnrollments: {
          include: {
            program: true,
          },
        },
      },
    });
    
    const res = programs ? programs.programEnrollments.map((enrollment) => enrollment.program) : [];
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error('[COURSES_BY_USER_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
