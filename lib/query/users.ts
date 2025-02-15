import prisma from '@/lib/postgres/db';
import { users } from '@prisma/client';

export async function getUserById(userId: number): Promise<users | null> {
  const dbUser = prisma.users.findUnique({
    where: { user_id: userId },
  });
  return dbUser;
}

export async function getUserByEmail(email: string): Promise<users | null> {
  const dbUser = prisma.users.findUnique({
    where: { email: email },
  });
  return dbUser;
}

export async function createUser(data: { name: string; email: string }): Promise<users | null> {
  const dbUser = await getUserByEmail(data.email);
  if (dbUser) {
    return dbUser;
  }
  const newUser = prisma.users.create({
    data,
  });
  return newUser;
}

export async function deleteUser(userId: number): Promise<users | null> {
  const deletedUser = prisma.users.delete({
    where: { user_id: userId },
  });
  return deletedUser;
}
