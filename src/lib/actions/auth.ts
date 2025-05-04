'use server';

export async function getPasswordResetLink(email: string) {
  if (!email) {
    return `${process.env.AUTH0_DOMAIN}/dbconnections/change_password`;
  }
  return `${process.env.AUTH0_DOMAIN}/dbconnections/change_password?client_id=${process.env.AUTH0_CLIENT_ID}&email=${encodeURIComponent(email)}`;
}
