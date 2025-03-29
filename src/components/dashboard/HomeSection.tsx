import { User, Program, Assignment } from '@prisma/client';
import { Box, Heading, Flex, Text, Skeleton } from '@chakra-ui/react';
import StreakCard from '../StreakCard';
import TodoCard from '@/src/components/dashboard/TodoCard';
import ProgramCard from '@/src/components/ProgramCard';

interface HomeSectionProps {
  userInfo: User | null;
  assignments: Assignment[];
  programs: Program[];
  isLoading: boolean;
}

export default function HomeSection({ userInfo, assignments, programs, isLoading }: HomeSectionProps) {
  return (
    <Box>
      {isLoading ? (
        <Skeleton width="300px" height="40px" mb={4} />
      ) : (
        <Heading mb={4}>Welcome, {userInfo?.name}</Heading>
      )}
      <Flex flexDirection={'column'} gap={4}>
        <Heading>Overview</Heading>
        <Flex flexDirection={'row'} gap={4}>
          <StreakCard currentPoints={10} nextRewardPoints={100} />
          {isLoading ? <Skeleton width="776px" height="200px" /> : <TodoCard assignments={assignments} />}
        </Flex>
      </Flex>
      <Box>
        <Heading>Programs</Heading>
        <Flex flexDirection={'row'} gap={4} flexWrap="wrap">
          {isLoading
            ? // Show 2 skeleton program cards while loading
              [...Array(2)].map((_, index) => <Skeleton key={index} width="420px" height="136px" />)
            : programs.map(program => <ProgramCard key={program.id} program={program} />)}
        </Flex>
      </Box>
    </Box>
  );
}
