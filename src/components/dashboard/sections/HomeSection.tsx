'use client';

import { useState } from 'react';
import { User, Program, Assignment } from '@prisma/client';
import { Box, Heading, Flex, Skeleton, Text } from '@chakra-ui/react';
import StreakCard from '@/src/components/StreakCard';
import TodoCard from '@/src/components/dashboard/TodoCard';
import ProgramCard from '@/src/components/ProgramCard';
import Link from 'next/link';
import DreamBuddy from '@/src/components/dreambuddy/DreamBuddy';
import Header from '../Header';

interface HomeSectionProps {
  userInfo: User | null;
  assignments: Assignment[];
  programs: Program[];
  isLoading: boolean;
}

export default function HomeSection({ userInfo, assignments, programs, isLoading }: HomeSectionProps) {
  const [isDreamBuddyVisible, setIsDreamBuddyVisible] = useState(true);

  return (
    <Box width={'100%'}>
      {isLoading ? (
        <Skeleton width="calc(100% - 96px)" height="60px" m="32px 48px 16px 48px" />
      ) : (
        <Header userInfo={userInfo}></Header>
      )}
      <Flex flexDirection={'column'} gap={'20px'} p="20px 48px" mt="16px">
        <Heading fontSize="28px" fontWeight={700}>
          Overview
        </Heading>
        <Flex flexDirection={'row'} gap={4}>
          {isLoading ? (
            <Skeleton width="323px" height="343px" />
          ) : (
            <StreakCard currentPoints={userInfo?.points || 0} nextRewardPoints={200} />
          )}
          {isLoading ? <Skeleton flex={1} height="343px" /> : <TodoCard assignments={assignments} />}
        </Flex>
      </Flex>
      <Box p="20px 48px">
        <Heading mb={'16px'}>Programs</Heading>
        <Flex flexDirection={'row'} gap={4} flexWrap="wrap">
          {isLoading
            ? [...Array(2)].map((_, index) => <Skeleton key={index} width="420px" height="136px" />)
            : programs.map(program => (
                <Link key={program.id} href={`/programs/${program.id}`} passHref style={{ textDecoration: 'none' }}>
                  <ProgramCard program={program} />
                </Link>
              ))}
        </Flex>
      </Box>
      {!isLoading && (
        <DreamBuddy
          calloutType="greeting"
          userName={userInfo?.name || ''}
          isVisible={isDreamBuddyVisible}
          onHide={() => setIsDreamBuddyVisible(false)}
        />
      )}
    </Box>
  );
}
