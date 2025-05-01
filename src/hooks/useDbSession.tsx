'use client';
import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { User as DbUser } from '@prisma/client';
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
  const [isDbFetchLoading, setIsDbFetchLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchSessionData = useCallback(async () => {
    if (!auth0User) {
      setDbUser(null);
      setIsDbFetchLoading(false);
      setError(null);
      return;
    }

    setIsDbFetchLoading(true);
    setError(null);
    setDbUser(null);

    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || `Session fetch failed: ${res.statusText}`);
      }
      if (data.error) {
        throw new Error(data.error);
      }

      setDbUser(data.dbUser);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching app session:', err);
      setError(err);
      setDbUser(null);
    } finally {
      setIsDbFetchLoading(false);
    }
  }, [auth0User]);

  useEffect(() => {
    if (!isAuth0Loading) {
      if (auth0User) {
        fetchSessionData();
      } else {
        setDbUser(null);
        setIsDbFetchLoading(false);
        setError(auth0Error);
      }
    } else {
      setIsDbFetchLoading(true);
      setDbUser(null);
      setError(null);
    }
  }, [auth0User, isAuth0Loading, auth0Error, fetchTrigger, fetchSessionData]);

  const refetch = () => {
    setIsDbFetchLoading(true);
    setError(null);
    setDbUser(null);
    setFetchTrigger(prev => prev + 1);
  };

  const isLoading = isAuth0Loading || isDbFetchLoading;

  const value: AppSession = {
    auth0User: auth0User || null,
    dbUser,
    isLoading,
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
