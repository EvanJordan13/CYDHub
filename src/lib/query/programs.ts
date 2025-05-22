'use server';

import prisma from '../postgres/db';
import { Program, ModuleMaterial, Module, Announcement, Assignment, User } from '@prisma/client';

export async function getAllPrograms(): Promise<Program[]> {
  return prisma.program.findMany();
}

export async function getProgramById(programId: number): Promise<Program> {
  const program = await prisma.program.findUnique({
    where: {
      id: programId,
    },
  });

  if (!program) {
    throw new Error(`No program found with ID ${programId}`);
  }

  return program;
}

export async function getUserById(userId: number): Promise<User> {
  if (userId === null) {
    throw new Error(`Id provided is null`);
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

export async function getProgramsByUser(userId: number, archived: boolean = false): Promise<Program[]> {
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
  if (archived) {
    return programs.programEnrollments
      .filter(enrollment => enrollment.program.archived)
      .map(enrollment => enrollment.program);
  } else {
    return programs.programEnrollments
      .filter(enrollment => !enrollment.program.archived)
      .map(enrollment => enrollment.program);
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

export async function fetchProgramsByUser(userId: number, archived: boolean = false): Promise<Program[]> {
  try {
    return await getProgramsByUser(userId, archived);
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
        modules: {
          include: {
            materials: true,
            assignments: true,
          },
        },
      },
    });

    if (!program) {
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
      return [];
    }

    return program.announcements;
  } catch (error) {
    return [];
  }
}

export async function getArchivedProgramsByUserId(userId: number): Promise<Program[]> {
  try {
    const programs = await fetchProgramsByUser(userId);
    const archived = programs.filter(p => p.archived);

    if (!archived) {
      console.log(`No archived programs`);
      return [];
    }
    return archived;
  } catch (error) {
    console.log(`[GET_ARCHIVED_PROGRAMS_ERROR]`, error);
    return [];
  }
}

export async function fetchProgramMaterialsByUser(
  userId: number,
): Promise<(ModuleMaterial & { moduleTitle: string })[]> {
  console.log('fetchProgramMaterialsByUser called');
  try {
    const programs = await getProgramsByUser(userId);
    const materials = await Promise.all(programs.map(program => fetchProgramMaterials(program.id)));
    return materials.flat();
  } catch (error) {
    console.error('[FETCH_PROGRAM_MATERIALS_BY_USER]', error);
    throw error;
  }
}
