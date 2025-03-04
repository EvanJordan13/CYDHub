import { getAllPrograms } from '@/src/lib/query/programs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const courses = await getAllPrograms();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('[COURSES_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
