'use server';

import prisma from '@/src/lib/postgres/db';
import { Module } from '@prisma/client';

export async function getModuleById(moduleId: number): Promise<Module> {
  if (moduleId === null) {
    throw new Error(`ID provided is null`);
  }

  const material = await prisma.module.findUnique({
    where: {
      id: moduleId,
    },
  });

  if (!material) {
    throw new Error(`No material found with ID ${moduleId}`);
  }

  return material;
}
