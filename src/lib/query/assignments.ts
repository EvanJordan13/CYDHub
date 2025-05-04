'use server';

import prisma from '@/src/lib/postgres/db';
import { Assignment, AssignmentQuestion, SubmissionAnswer } from '@prisma/client';

export async function getAssignmentById(
  assignmentId: number,
): Promise<Assignment & { questions: AssignmentQuestion[] }> {
  if (assignmentId === null) {
    throw new Error(`ID provided is null`);
  }
  const assignment = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      questions: true, // ← grab the related AssignmentQuestion[]
    },
  });
  if (!assignment) {
    throw new Error(`No assignment found with ID ${assignmentId}`);
  }
  assignment.questions;
  return assignment;
}

export async function getAssignmentByIdQuestionsAndSubmissions(assignmentId: number): Promise<AssignmentQuestion[]> {
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      questions: {
        include: {
          SubmissionAnswer: true,
        },
      },
    },
  });
  if (!assignment) throw new Error('Not found');
  return assignment.questions;
}
