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
  
  return programs ? programs.programEnrollments.map((enrollment) => enrollment.program) : [];
}