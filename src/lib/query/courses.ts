import prisma from '../postgres/db';
import { Course } from '@prisma/client';

export async function getAllCourses(): Promise<Course[]> {
  return prisma.course.findMany();
}

export async function getCoursesByClassroomId(classroomId: number): Promise<Course[]> {
  return prisma.course.findMany({ where: { classroomId } });
}
