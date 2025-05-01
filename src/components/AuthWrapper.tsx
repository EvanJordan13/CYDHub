'use client';

import { useEffect } from 'react';
import { Spinner, Center, Text, Box } from '@chakra-ui/react';
import { useDbSession } from '@/src/hooks/useDbSession';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { dbUser, auth0User, isLoading, error } = useDbSession();
  const router = useRouter();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (isLoading || typeof window === 'undefined') {
      return;
    }

    if (error) {
      console.error('AuthWrapper: Session error, redirecting to login.', error);
      router.push('/api/auth/login');
      return;
    }

    if (!auth0User) {
      console.warn('AuthWrapper: No Auth0 user found after loading, redirecting to login.');
      router.push('/api/auth/login');
      return;
    }

    if (!dbUser) {
      console.error('AuthWrapper: DB user not found after loading, redirecting to login.');
      router.push('/api/auth/login');
      return;
    }

    if (!dbUser.signupComplete && currentPath !== '/onboarding') {
      console.log('AuthWrapper: User onboarding incomplete, redirecting to /onboarding.');
      router.push('/onboarding');
      return;
    }

    if (dbUser.signupComplete && currentPath === '/onboarding') {
      console.log('AuthWrapper: User onboarding complete, redirecting to /dashboard.');
      router.push('/dashboard');
      return;
    }
  }, [dbUser, auth0User, isLoading, error, currentPath, router]);

  return <>{children}</>;
}
