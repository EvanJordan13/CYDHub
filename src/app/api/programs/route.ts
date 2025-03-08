import { NextResponse } from 'next/server';
import prisma from "@/src/lib/postgres/db";

export async function GET() {
  try {
    const courses = await prisma.program.findMany();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('[COURSES_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
