import prisma from '../postgres/db';
import { Module } from '@prisma/client';

export async function getProgramModules(programId: number): Promise<Module[]> {
  try {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        modules: true,
      },
    });

    if (!program) {
      console.log(`No program found with ID ${programId}`);
      return [];
    }

    return program.modules;
  } catch (error) {
    console.error('[GET_PROGRAM_MODULES_ERROR]', error);
    return [];
  }
}