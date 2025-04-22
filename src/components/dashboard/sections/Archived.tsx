import { Text, Image, Flex, VStack, HStack, Link, Wrap, WrapItem, Skeleton, SkeletonText, Box } from '@chakra-ui/react';
import { Program, User } from '@prisma/client';
import ProgramCard from '@/src/components/ProgramCard';

export function ProgramCardSkeleton() {
  return (
    <VStack
      width="fit-content"
      minW="22rem"
      maxW="23rem"
      p="1.5rem 2rem"
      borderRadius="0.75rem"
      boxShadow="0 0 0.25rem rgba(0,0,0,.25)"
      bg="white"
      align="flex-start"
      gap="0.75rem"
    >
      <Skeleton boxSize="5rem" borderRadius="full" />
      <Skeleton height="0.875rem" width="60%" />
      <SkeletonText mt="0.5rem" noOfLines={2} gap="0.5rem" height="1rem" w="100%" />
    </VStack>
  );
}

interface ArchivedPageProps {
  userInfo: User | null;
  archivedPrograms: Program[];
  isLoading: boolean;
}

export default function ArchivedPage({ userInfo, archivedPrograms, isLoading }: ArchivedPageProps) {
  return (
    <Flex direction={'row'}>
      <VStack width={'100%'}>
        <HStack
          marginBottom={2}
          paddingY={8}
          paddingX={12}
          justify={'space-between'}
          width={'100%'}
          shadow={'0px 2px 2px #e3dbdb'}
          dropShadow={'10px 10px 10px rgba(0, 0, 0, 0.5)'}
        >
          <Text fontSize={'40px'} fontWeight={'bold'}>
            Welcome, {userInfo?.name}
          </Text>
          <HStack gap={2}>
            <Image src="/lightning.svg" alt="Points logo" />
            <Text fontSize={'3xl'} fontWeight={'bold'} color={'#FFCE29'}>
              {userInfo?.points}
            </Text>
          </HStack>
        </HStack>
        {archivedPrograms.length > 0 ? (
          <VStack paddingY={5} paddingX={12} align={'start'} width={'100%'} gap={4}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              Previous Programs
            </Text>
            <Wrap gap={5} justify="flex-start">
              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <WrapItem key={i}>
                      <ProgramCardSkeleton />
                    </WrapItem>
                  ))
                : archivedPrograms.map(program => (
                    <WrapItem key={program.id}>
                      <Link href={`/programs/${program.id}`} style={{ textDecoration: 'none' }}>
                        <ProgramCard program={program} />
                      </Link>
                    </WrapItem>
                  ))}
            </Wrap>
          </VStack>
        ) : (
          <Flex w="100%" h={'75vh'} justify="center" align={'center'}>
            <Text fontSize="2xl" fontWeight="bold">
              No Archived Courses
            </Text>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
}
