'use server';

import prisma from '../postgres/db';
import { Program, ModuleMaterial, Module, Announcement, Assignment } from '@prisma/client';

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
    throw error;
  }
}

export async function fetchProgramMaterials(programId: number): Promise<(ModuleMaterial & { moduleTitle: string })[]> {
  try {
    return await getProgramMaterials(programId);
  } catch (error) {
    console.error('[FETCH_PROGRAM_MATERIALS]', error);
    throw error;
  }
}

export async function getProgramAssignments(programId: number): Promise<(Assignment & { moduleTitle: string })[]> {
  try {
    const assignments = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        modules: {
          include: {
            assignments: true,
          },
        },
      },
    });

    if (!assignments) {
      console.log(`No program found with ID ${programId}`);
      return [];
    }

    const flattenedAssignments = assignments.modules.flatMap(module =>
      module.assignments.map(assignment => ({
        ...assignment,
        moduleTitle: module.title,
      })),
    );

    return flattenedAssignments;
  } catch (error) {
    throw error;
  }
}

export async function fetchProgramAssignments(programId: number): Promise<(Assignment & { moduleTitle: string })[]> {
  try {
    return await getProgramAssignments(programId);
  } catch (error) {
    console.error('[FETCH_PROGRAM_ASSIGNMENTS]', error);
    throw error;
  }
}

export async function fetchProgramAssignmentsByUser(userId: number): Promise<(Assignment & { moduleTitle: string })[]> {
  try {
    const programs = await getProgramsByUser(userId);
    const assignments = await Promise.all(programs.map(program => fetchProgramAssignments(program.id)));
    return assignments.flat();
  } catch (error) {
    console.error('[FETCH_PROGRAM_ASSIGNMENTS_BY_USER]', error);
    throw error;
  }
}
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

export async function getProgramAnnouncements(programId: number): Promise<Announcement[]> {
  try {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        announcements: true,
      },
    });

    if (!program) {
      console.log(`No program found with ID ${programId}`);
      return [];
    }

    return program.announcements;
  } catch (error) {
    console.log(`[GET_PROGRAM_ANNOUNCEMENTS_ERROR]`, error);
    return [];
  }
}
