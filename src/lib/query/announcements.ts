'use server';

import prisma from '../postgres/db';
import { Announcement } from '@prisma/client';

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
