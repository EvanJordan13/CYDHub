'use client';
import { useState, useEffect } from 'react';
import { login, logout, getUser } from '../app/auth/actions';

interface User {
  name?: string;
  email?: string;
  picture?: string;
  role?: string;
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p style={{ color: 'black' }}>Welcome, {user.name}!</p>
          <form action={logout}>
            <button type="submit" style={{ color: 'black', cursor: 'pointer' }}>
              Logout
            </button>
          </form>
        </>
      ) : (
        // NOTE: Right now this doesn't work, only because we don't have any auth0 credentials
        <form action={login}>
          <button type="submit" style={{ color: 'black', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}
