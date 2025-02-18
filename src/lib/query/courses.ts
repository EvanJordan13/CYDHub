import prisma from '../postgres/db';
import { Course } from '@prisma/client';

export async function getAllCourses(): Promise<Course[]> {
  return prisma.course.findMany();
}
