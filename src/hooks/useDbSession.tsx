'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as DbUser, User } from '@prisma/client';
import { UserProfile, useUser as useAuth0User } from '@auth0/nextjs-auth0/client';

export interface AppSession {
  auth0User: UserProfile | null;
  dbUser: DbUser | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

const SessionContext = createContext<AppSession | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { user: auth0User, isLoading: isAuth0Loading, error: auth0Error } = useAuth0User();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchSessionData = () => {
    setIsLoading(true);
    setError(null);

    fetch('/api/auth/session')
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || data.message || `Session fetch failed: ${res.statusText}`);
        }
        return data;
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setDbUser(data.dbUser);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching app session:', err);
        setError(err);
        setDbUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isAuth0Loading && auth0User) {
      fetchSessionData();
    } else if (!isAuth0Loading && !auth0User) {
      setDbUser(null);
      setError(auth0Error);
      setIsLoading(false);
    } else if (isAuth0Loading) {
      setIsLoading(true);
    }
  }, [auth0User, isAuth0Loading, auth0Error, fetchTrigger]);

  const refetch = () => {
    setFetchTrigger(prev => prev + 1);
  };

  const value: AppSession = {
    auth0User: auth0User || null,
    dbUser,
    isLoading: isAuth0Loading || isLoading,
    error,
    refetch,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useDbSession(): AppSession {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useDbSession must be used within a SessionProvider');
  }
  return context;
}
