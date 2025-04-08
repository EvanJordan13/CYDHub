// src/components/AuthRedirect.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner, Center } from '@chakra-ui/react';

export default function AuthRedirect() {
  const { user, isLoading } = useUser();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in, redirect to home
        router.push('/');
        return;
      }

      // Check if profile is complete
      fetch('/api/auth/session')
        .then(res => res.json())
        .then(data => {
          const isComplete = data.user?.signupComplete;
          if (isComplete) {
            router.push('/dashboard');
          } else {
            // Redirect to onboarding
            router.push('/onboarding');
          }
        })
        .catch(err => {
          console.error('Error checking session:', err);
          // If there's an error, redirect to onboarding as a safe default
          router.push('/onboarding');
        })
        .finally(() => {
          setIsCheckingProfile(false);
        });
    }
  }, [user, isLoading, router]);

  return (
    <Center h="100vh">
      <Spinner size="xl" color="Aqua" />
    </Center>
  );
}
