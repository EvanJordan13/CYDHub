'use server';

import prisma from '@/src/lib/postgres/db';
import { ModuleMaterial } from '@prisma/client';

export async function getMaterialById(materialId: number): Promise<ModuleMaterial> {
  if (materialId === null) {
    throw new Error(`ID provided is null`);
  }

  const material = await prisma.moduleMaterial.findUnique({
    where: {
      id: materialId,
    },
  });

  if (!material) {
    throw new Error(`No material found with ID ${materialId}`);
  }

  return material;
}
