import { NextResponse } from 'next/server';
import { getCoursesByClassroomId } from '@/src/lib/query/courses';

export async function GET({ params }: { params: { classroomId: number } }) {
  const classroomId = params.classroomId;
  try {
    const courses = await getCoursesByClassroomId(classroomId);
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('[COURSES_BY_CLASSROOM_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
