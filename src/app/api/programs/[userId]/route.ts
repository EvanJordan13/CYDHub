import { NextResponse } from 'next/server';
import { getProgramsByUser } from '@/src/lib/db/programs';

export async function GET({ params }: { params: { userId: number } }) {
  const userId = params.userId;
  try {
    const courses = await getProgramsByUser(userId);
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('[COURSES_BY_USER_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
