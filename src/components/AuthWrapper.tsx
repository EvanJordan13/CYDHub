'use client';

import { useEffect, useState } from 'react';
import { Spinner, Box, Center, Text } from '@chakra-ui/react';
import { useDbSession } from '@/src/hooks/useDbSession';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { dbUser, auth0User, isLoading, error } = useDbSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (isRedirecting || typeof window === 'undefined') {
      return;
    }

    if (!isLoading) {
      if (error) {
        console.error('AuthWrapper: Error loading session, redirecting to login.', error);
        setIsRedirecting(true);
        window.location.assign('/api/auth/login');
      } else if (!auth0User) {
        setIsRedirecting(true);
        window.location.assign('/api/auth/login');
      } else if (!dbUser) {
        console.warn('AuthWrapper: Auth0 user exists, but DB user not found/linked. Redirecting to login for safety.');
        setIsRedirecting(true);
        window.location.assign('/api/auth/login');
      } else if (!dbUser.signupComplete && currentPath !== '/onboarding') {
        setIsRedirecting(true);
        window.location.assign('/onboarding');
      } else {
        if (isRedirecting) setIsRedirecting(false);
      }
    }
  }, [dbUser, auth0User, isLoading, error, currentPath, isRedirecting]);

  return <>{children}</>;
}
