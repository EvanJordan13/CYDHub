'use server';
import { getSession, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export async function login() {
  'use server';
  await handleLogin();
  redirect('/');
}

export async function logout() {
  'use server';
  await handleLogout();
  redirect('/');
}

export async function getUser() {
  'use server';
  const session = await getSession();
  return session?.user || null;
}
