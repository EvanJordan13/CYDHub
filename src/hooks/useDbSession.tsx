'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@prisma/client';

type Auth0User = {
  email: string;
  name: string;
  sub: string;
};

export function useDbSession() {
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [auth0User, setAuth0User] = useState<Auth0User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setDbUser(data.dbUser);
      setAuth0User(data.session?.user || null);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let retries = 0;
    let interval: NodeJS.Timeout;

    const tryFetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();

        if (data.dbUser) {
          setDbUser(data.dbUser);
          setAuth0User(data.session?.user || null);
          setIsLoading(false);
          clearInterval(interval);
        } else {
          retries++;
          if (retries >= 10) {
            setIsLoading(false);
            clearInterval(interval);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
        clearInterval(interval);
      }
    };

    tryFetchSession();
    interval = setInterval(tryFetchSession, 500);

    return () => clearInterval(interval);
  }, []);

  return {
    dbUser,
    auth0User,
    isLoading,
    error,
    refetch: fetchSession,
  };
}
