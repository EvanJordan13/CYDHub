'use client';

import ContentBox from '@/src/components/ContentBox';
import { Box, Text } from '@chakra-ui/react';
import SelectionPanel from '@/src/components/SelectionPanel';

export default function CourseLanding() {
  return (
    <Box w="full" backgroundColor="white">
      <Box w="full" h="10vh" borderBottomWidth={5} borderBottomColor={'black'}>
        <Text color="black">Header placeholder</Text>
      </Box>
      <Box w="full" h="30vh" borderBottomWidth={5} borderBottomColor={'black'}>
        <Text color="black">Banner image placeholder</Text>
      </Box>
      <Box padding={10}>
        <Text color="black" fontSize={40} marginBottom={2}>
          Intro to Python!
        </Text>
        <SelectionPanel headers={['Assignments', 'Materials', 'Announcements', 'Feedback']} />
        <Text color="black" marginTop={10} marginBottom={4} fontWeight={500}>
          Week 3
        </Text>
        <ContentBox title="Intro to For Loops" buttonText="Start Assignment" />
        <ContentBox title="Intro to Arrays" buttonText="Finished" />
      </Box>
    </Box>
  );
}
