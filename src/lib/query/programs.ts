'use server';

import prisma from '../postgres/db';
import { Program } from '@prisma/client';

export async function getAllPrograms(): Promise<Program[]> {
  return prisma.program.findMany();
}

export async function getProgramsByUser(userId: number): Promise<Program[]> {
  const programs = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      programEnrollments: {
        include: {
          program: true,
        },
      },
    },
  });

  if (!programs) {
    throw new Error(`No user found with ID ${userId}`);
  }

  return programs.programEnrollments.map(enrollment => enrollment.program);
}

export async function fetchAllPrograms(): Promise<Program[]> {
  try {
    return await getAllPrograms();
  } catch (error) {
    console.error('[FETCH_PROGRAMS]', error);
    throw new Error('Failed to fetch programs');
  }
}

export async function fetchProgramsByUser(userId: number): Promise<Program[]> {
  try {
    return await getProgramsByUser(userId);
  } catch (error) {
    console.error('[FETCH_PROGRAMS_BY_USER]', error);
    throw error;
  }
}