'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSession(options = { required: false }) {
  const { user, error, isLoading } = useUser();
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // If authentication is required and user isn't logged in,
    // redirect to login page
    if (options.required && !isLoading && !user) {
      router.push('/api/auth/login');
      return;
    }

    if (user) {
      // Fetch additional user data from database
      fetch(`/api/users/${user.sub}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setIsSessionLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setIsSessionLoading(false);
        });
    } else {
      setIsSessionLoading(false);
    }
  }, [user, isLoading, options.required, router]);

  return {
    user,
    userData,
    isLoading: isLoading || isSessionLoading,
    error,
  };
}
