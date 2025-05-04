'use server';

import prisma from '@/src/lib/postgres/db';
import { getSession } from '@auth0/nextjs-auth0';
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
      questions: true,
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

export type AnswerInput = {
  assignmentQuestionId: number;
  answerText?: string;
  fileUrl?: string;
};

export async function submitAssignment(studentId: number, assignmentId: number, answers: AnswerInput[]) {
  return await prisma.$transaction(async tx => {
    const submission = await tx.submission.upsert({
      where: {
        studentId_assignmentId: { studentId, assignmentId },
      },
      create: {
        studentId,
        assignmentId,
        completed: true,
        submittedAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        completed: true,
        updatedAt: new Date(),
      },
    });

    await tx.submissionAnswer.deleteMany({
      where: { submissionId: submission.id },
    });

    const createdAnswers = await Promise.all(
      answers.map(a =>
        tx.submissionAnswer.create({
          data: {
            submissionId: submission.id,
            assignmentQuestionId: a.assignmentQuestionId,
            answerText: a.answerText,
            fileUrl: a.fileUrl,
          },
        }),
      ),
    );

    return {
      ...submission,
      answers: createdAnswers,
    };
  });
}

export type QuestionWithAnswer = AssignmentQuestion & {
  existingAnswer: SubmissionAnswer | null;
};

export async function getAssignmentByIdQuestions(
  assignmentId: number,
  studentId: number,
): Promise<QuestionWithAnswer[]> {
  const rows = await prisma.assignmentQuestion.findMany({
    where: { assignmentId },
    orderBy: { order: 'asc' },
    include: {
      SubmissionAnswer: {
        where: {
          submission: {
            studentId,
            assignmentId,
          },
        },
        take: 1,
      },
    },
  });

  return rows.map(q => ({
    id: q.id,
    assignmentId: q.assignmentId,
    questionText: q.questionText,
    questionType: q.questionType,
    options: q.options,
    order: q.order,
    existingAnswer: q.SubmissionAnswer.length > 0 ? q.SubmissionAnswer[0] : null,
  }));
}

interface SubmitQuestionAnswerParams {
  assignmentId: number;
  questionId: number;
  studentId: number;
  answerText?: string;
  fileUrl?: string;
}

export async function submitQuestionAnswer(params: {
  assignmentId: number;
  questionId: number;
  answerText?: string;
  fileUrl?: string;
}) {
  const { assignmentId, questionId, answerText, fileUrl } = params;

  const session = await getSession();
  if (!session?.user || !session.user.sub) {
    throw new Error('Not authenticated');
  }
  const auth0Sub = session.user.sub;

  const me = await prisma.user.findUnique({
    where: { auth0Id: auth0Sub },
    select: { id: true },
  });
  if (!me) {
    throw new Error('User record not found');
  }
  const studentId = me.id;

  await prisma.$transaction(async tx => {
    const submission = await tx.submission.upsert({
      where: {
        studentId_assignmentId: { studentId, assignmentId },
      },
      create: {
        studentId,
        assignmentId,
        completed: false,
      },
      update: {},
    });

    await tx.submissionAnswer.upsert({
      where: {
        submissionId_assignmentQuestionId: {
          submissionId: submission.id,
          assignmentQuestionId: questionId,
        },
      },
      create: {
        submissionId: submission.id,
        assignmentQuestionId: questionId,
        answerText,
        fileUrl,
      },
      update: {
        answerText,
        fileUrl,
      },
    });
  });
}
