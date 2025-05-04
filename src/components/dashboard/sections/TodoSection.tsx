import { Assignment } from '@prisma/client';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import TodoDropdown from '../TodoDropdown';
import { User } from '@prisma/client';
import Header from '../Header';

interface TodoSectionProps {
  userInfo: User | null;
  assignments: Assignment[];
}

export default function TodoSection({ userInfo, assignments }: TodoSectionProps) {
  const todayAssignments = assignments.filter(assignment => {
    if (!assignment.dueDate) return false;
    const assignmentDate = new Date(assignment.dueDate);
    const today = new Date();
    return assignmentDate.toDateString() === today.toDateString();
  });

  const thisWeekAssignments = assignments.filter(assignment => {
    if (!assignment.dueDate) return false;
    const assignmentDate = new Date(assignment.dueDate);
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), 0, 1);
    const endOfWeek = new Date(today.getFullYear(), 0, 7);
    return (
      assignmentDate.toDateString() !== today.toDateString() &&
      assignmentDate >= startOfWeek &&
      assignmentDate <= endOfWeek
    );
  });

  const upcomingAssignments = assignments.filter(assignment => {
    if (!assignment.dueDate) return false;
    const assignmentDate = new Date(assignment.dueDate);
    const today = new Date();
    const endOfWeek = new Date(today.getFullYear(), 0, 7);
    return assignmentDate > endOfWeek;
  });

  return (
    <Box width={'100%'}>
      <Header userInfo={userInfo}></Header>

      <Box pt={'32px'} px={'48px'}>
        <Heading fontSize={'32px'} fontWeight={700} lineHeight={'normal'}>
          To Do
        </Heading>
        <Text fontSize={'16px'} fontWeight={500} mb={'32px'}>
          View all the work you have to do, anytime soon, or in the future!
        </Text>
        <Flex flexDirection={'column'} gap={'32px'} width={'100%'}>
          <TodoDropdown title="Today" assignments={todayAssignments} />
          <TodoDropdown title="This Week" assignments={thisWeekAssignments} />
          <TodoDropdown title="Upcoming Work" assignments={upcomingAssignments} />
        </Flex>
      </Box>
    </Box>
  );
}
