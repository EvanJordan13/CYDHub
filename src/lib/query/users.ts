'use server';

import prisma from '@/src/lib/postgres/db';
import { User, SurveyResponse } from '@prisma/client';

export async function getUserById(userId: number): Promise<User> {
  if (userId === null) {
    throw new Error(`ID provided is null`);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error(`No user found with ID ${userId}`);
  }

  return user;
}

export async function updateUserPoints(userId: number, points: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: points } },
  });
}

export async function getUserNameById(userId: number): Promise<string> {
  if (userId === null) {
    throw new Error(`ID provided is null`);
  }

  const user = await getUserById(userId);

  if (!user) {
    throw new Error(`No user found with ID ${userId}`);
  }
  if (user.name === null) {
    throw new Error(`User ${userId} does not have a name`);
  }
  return user.name;
}

export async function fetchCompletedAssignments(userId: number) {
  const userWithSubmissions = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      submissions: {
        include: {
          assignment: true,
        },
      },
    },
  });

  if (!userWithSubmissions) {
    throw new Error(`No user found with ID ${userId}`);
  }

  const completedAssignments = userWithSubmissions.submissions.map(submission => submission.assignment);

  return completedAssignments;
}

export async function storeUserSurveyResponse(userId: number, surveyResponse: SurveyResponse) {
  if (userId === null) {
    throw new Error(`ID provided is null`);
  }

  if (surveyResponse === null) {
    throw new Error(`Survey Response provided is null`);
  }
  await prisma.user.update({
    where: { id: userId },
    data: { surveyResponses: { connect: { id: surveyResponse.id } } },
  });
}

export async function updateUser(userId: number, data: { name?: string; pronouns?: string }): Promise<User> {
  if (userId === null) {
    throw new Error(`ID provided is null`);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
    },
  });

  if (!user) {
    throw new Error(`No user found with ID ${userId}`);
  }

  return user;
}
