'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Button, Center, Spinner } from '@chakra-ui/react';

export default function InvitePage({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteData, setInviteData] = useState<any>(null);
  const router = useRouter();
  const { token } = params;

  useEffect(() => {
    const validateInvite = async () => {
      try {
        const res = await fetch(`/api/invitations/${token}`);

        if (!res.ok) {
          throw new Error('Invalid or expired invitation');
        }

        const data = await res.json();
        setInviteData(data);

        // Store the invitation token in sessionStorage
        sessionStorage.setItem('invitation_token', token);

        // Redirect to signup
        router.push(`/api/auth/login?screen_hint=signup`);
      } catch (error) {
        console.error('Error validating invitation:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    validateInvite();
  }, [token, router]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="Aqua" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box maxW="md" mx="auto" mt={10} p={8} textAlign="center">
        <Heading color="red.500" mb={4}>
          Invitation Error
        </Heading>
        <Text mb={6}>{error}</Text>
        <Button colorScheme="blue" onClick={() => router.push('/')}>
          Go Home
        </Button>
      </Box>
    );
  }

  return null; // This should not render as we redirect in useEffect
}
