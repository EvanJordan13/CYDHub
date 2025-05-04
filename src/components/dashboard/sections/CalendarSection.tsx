import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Calendar from '../calendar/Calendar';
import { Assignment, ModuleMaterial, User } from '@prisma/client';
import Header from '../Header';

interface CalendarSectionProps {
  userInfo: User | null;
  assignments: Assignment[];
  materials: ModuleMaterial[];
}

export default function CalendarSection({ userInfo, assignments, materials }: CalendarSectionProps) {
  return (
    <Box width={'100%'}>
      <Header userInfo={userInfo}></Header>

      <Box direction={'column'} mx={'48px'} mt={12} mb={8}>
        <Heading fontSize="35px" fontWeight={700}>
          Calendar
        </Heading>

        <Text fontSize="16px" fontWeight={500} mt={4} mb={8}>
          Take a look and schedule out your day to help keep you on track.
        </Text>

        <Calendar assignments={assignments} materials={materials} />
      </Box>
    </Box>
  );
}
