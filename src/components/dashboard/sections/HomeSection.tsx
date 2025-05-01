import { User, Program, Assignment } from '@prisma/client';
import { Box, Heading, Flex, Text, Skeleton } from '@chakra-ui/react';
import StreakCard from '../../StreakCard';
import TodoCard from '@/src/components/dashboard/TodoCard';
import ProgramCard from '@/src/components/ProgramCard';
import Link from 'next/link';
import Image from 'next/image';

interface HomeSectionProps {
  userInfo: User | null;
  assignments: Assignment[];
  programs: Program[];
}

export default function HomeSection({ userInfo, assignments, programs }: HomeSectionProps) {
  const isHeaderLoading = !userInfo;
  const isOverviewLoading = !userInfo || !assignments;
  const areProgramsLoading = !programs;

  return (
    <Box width={'100%'}>
      {isHeaderLoading ? (
        <Skeleton width="calc(100% - 96px)" height="60px" m="32px 48px 16px 48px" />
      ) : (
        <Flex flexDirection={'row'} justifyContent={'space-between'} p="32px 48px 16px 48px">
          <Heading fontSize="40px" fontWeight={700} lineHeight={'48px'}>
            Welcome, {userInfo?.name}
          </Heading>
          <Flex flexDirection={'row'} gap={'8px'} alignItems={'center'}>
            <Image src="/streak-card-icon.svg" alt="streak" width={19} height={28} />
            <Text fontSize={'32px'} fontWeight={700} lineHeight={'normal'} color={'#FFCE29'}>
              {userInfo?.points}
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex flexDirection={'column'} gap={'20px'} p="20px 48px" mt="16px">
        <Heading fontSize="28px" fontWeight={700}>
          Overview
        </Heading>
        <Flex flexDirection={'row'} gap={4}>
          {isOverviewLoading ? (
            <Skeleton width="343px" height="250px" borderRadius="md" />
          ) : (
            <StreakCard currentPoints={userInfo?.points || 0} nextRewardPoints={200} />
          )}
          {isOverviewLoading ? (
            <Skeleton flex={1} height="250px" borderRadius="12px" />
          ) : (
            <TodoCard assignments={assignments} />
          )}
        </Flex>
      </Flex>
      <Box p="20px 48px">
        <Heading mb={'16px'}>Programs</Heading>
        <Flex flexDirection={'row'} gap={4} flexWrap="wrap">
          {areProgramsLoading ? (
            [...Array(2)].map((_, index) => (
              <Skeleton key={index} minWidth="340px" maxWidth="345px" height="136px" borderRadius="12px" />
            ))
          ) : programs && programs.length > 0 ? (
            programs.map(program => (
              <Link key={program.id} href={`/programs/${program.id}`} passHref style={{ textDecoration: 'none' }}>
                <ProgramCard program={program} />
              </Link>
            ))
          ) : (
            <Text>No programs found.</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
