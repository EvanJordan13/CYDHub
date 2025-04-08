// src/components/AuthWrapper.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner, Box, Center } from '@chakra-ui/react';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const [isCheckingDb, setIsCheckingDb] = useState(true);
  const [signupComplete, setSignupComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/api/auth/login');
        return;
      }

      // Check session and initialize user if needed
      fetch('/api/auth/session')
        .then(res => res.json())
        .then(data => {
          if (data.dbUser) {
            setSignupComplete(data.dbUser.signupComplete);

            // Check for invitation
            const inviteToken = sessionStorage.getItem('invitation_token');
            if (inviteToken && !data.dbUser.signupComplete) {
              // Process invitation
              fetch(`/api/invitations/accept`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: inviteToken }),
              }).then(() => {
                sessionStorage.removeItem('invitation_token');
              });
            }

            // Redirect if profile is not complete
            if (!data.dbUser.signupComplete) {
              router.push('/complete-profile');
            }
          }
          setIsCheckingDb(false);
        })
        .catch(err => {
          console.error('Error checking session:', err);
          setIsCheckingDb(false);
        });
    }
  }, [user, isLoading, router]);

  if (isLoading || isCheckingDb) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="Aqua" />
      </Center>
    );
  }

  return <>{children}</>;
}
