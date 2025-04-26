'use client';

import { VStack, Center, Image, Heading, Text, Spinner } from '@chakra-ui/react';
import { getUserNameById } from '@/src/lib/query/users';
import Button from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubmissionSuccessPage() {
  const userId = 1; // Needs to be changed for a particular user
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const points = 52; // Need to ask Sid/Azaan about pts
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const name = await getUserNameById(userId);
        // Only take the first name
        setUserName(name.split(' ')[0]);
      } catch (error) {
        console.error('Error fetching user name:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);
  if (loading) {
    return (
      <Center height="100vh" width="100vw">
        <Spinner size="xl" />
      </Center>
    );
  }
  return (
    <Center height="90vh" width="100vw">
      <VStack gap={5}>
        <Image src="/sideways-happy.svg" height={36} width={36} alt="smiling dreambuddy" marginBottom={5} />
        <Heading fontSize="3xl">Thanks for submitting {userName}!</Heading>
        <Text fontSize="lg" fontWeight={'medium'} marginBottom={3}>
          You have gained{' '}
          <Text as="span" fontWeight="bold" color="Aqua">
            {points} points
          </Text>{' '}
          from this assignment!
        </Text>
        <Button
          type="primary"
          pageColor="aqua"
          text="Continue"
          height={16}
          width={40}
          onClick={() => {
            router.push('/programs/');
          }}
        />
      </VStack>
    </Center>
  );
}
