'use client';

import { VStack, Center, Image, Heading, Text, Spinner } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDbSession } from '@/src/hooks/useDbSession';

export default function SubmissionSuccessPage({ params }: { params: { programId: number } }) {
  const { dbUser } = useDbSession();
  const { user, isLoading } = useUser();
  const router = useRouter();
  const points = 52;

  if (isLoading) {
    return (
      <Center height="100vh" width="100vw">
        <Spinner size="xl" />
      </Center>
    );
  }

  const name = dbUser?.name;

  return (
    <Center height="90vh" width="100vw">
      <VStack gap={5}>
        <Image src="/sideways-happy.svg" height={36} width={36} alt="smiling dreambuddy" marginBottom={5} />
        <Heading fontSize="3xl">Thanks for submitting, {name}!</Heading>
        <Text fontSize="lg" fontWeight="medium" marginBottom={3}>
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
          textSize="16px"
          height={16}
          width={40}
          onClick={() => {
            router.push(`/programs/${params.programId}`);
          }}
        />
      </VStack>
    </Center>
  );
}
