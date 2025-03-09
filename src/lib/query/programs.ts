'use server';

import prisma from '../postgres/db';
import { Program, ModuleMaterial } from '@prisma/client';

export async function getAllPrograms(): Promise<Program[]> {
  return prisma.program.findMany();
}

export async function getProgramsByUser(userId: number): Promise<Program[]> {
  try {
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
      console.log(`No user found with ID ${userId}`);
      return [];
    }

    return programs.programEnrollments.map(enrollment => enrollment.program);
  } catch (error) {
    console.error('[GET_PROGRAMS_BY_USER_ERROR]', error);
    return [];
  }
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
    return [];
  }
}

export async function getProgramMaterials(programId: number): Promise<(ModuleMaterial & { moduleTitle: string })[]> {
  try {
    const materials = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        modules: {
          include: {
            materials: true,
          },
        },
      },
    });

    if (!materials) {
      console.log(`No program found with ID ${programId}`);
      return [];
    }

    const flattenedMaterials = materials.modules.flatMap(module =>
      module.materials.map(material => ({
        ...material,
        moduleTitle: module.title,
      })),
    );

    return flattenedMaterials;
  } catch (error) {
    console.error('[GET_PROGRAM_MATERIALS_ERROR]', error);
    return [];
  }
}

export async function fetchProgramMaterials(programId: number): Promise<(ModuleMaterial & { moduleTitle: string })[]> {
  try {
    return await getProgramMaterials(programId);
  } catch (error) {
    console.error('[FETCH_PROGRAM_MATERIALS]', error);
    return [];
  }
}
