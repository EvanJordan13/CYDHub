'use client';

import { Box, Center, Spinner } from '@chakra-ui/react';
import LandingPage from './landing/page';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (!isLoading && user && user.email) {
      fetch(`/api/users/lookup?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.signupComplete) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        })
        .catch(err => {
          console.error('Error checking user status:', err);
          window.location.href = '/api/auth/login';
        });
    } else if (!isLoading && !user) {
      setShowLanding(true);
    }
  }, [user, isLoading, router]);

  if (isLoading || (user && showLanding)) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="Aqua" />
      </Center>
    );
  }

  return <LandingPage />;
}
