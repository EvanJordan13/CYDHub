'use server';

import prisma from '@/src/lib/postgres/db';
import { Assignment } from '@prisma/client';

export async function getAssignmentById(assignmentId: number): Promise<Assignment> {
  if (assignmentId === null) {
    throw new Error(`ID provided is null`);
  }

  const assignment = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
  });

  if (!assignment) {
    throw new Error(`No assignment found with ID ${assignmentId}`);
  }

  return assignment;
}
