'use server';

import prisma from '@/src/lib/postgres/db';
import { User } from '@prisma/client';

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
