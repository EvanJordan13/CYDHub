'use client';

import { useState } from 'react';
import ContentBox from '@/src/components/ContentBox';
import { Box, Text } from '@chakra-ui/react';
import SelectionPanel from '@/src/components/SelectionPanel';

enum Tab {
  Assignments = 0,
  Materials = 1,
  Announcements = 2,
  Feedback = 3,
}

export default function CourseLanding() {
  const [tab, setTab] = useState<Tab>(Tab.Assignments);

  return (
    <Box w="full" backgroundColor="white">
      <Box w="full" h="12vh">
        <Text color="black">Header placeholder</Text>
      </Box>
      <Box w="96%" h="40vh" backgroundColor={'#BC3860'} borderRadius={10} marginInline={'auto'}></Box>
      <Box padding={7}>
        <Text color="#BC3860" fontSize={37} fontWeight={700} marginBottom={2}>
          Intro to Python!
        </Text>
        <SelectionPanel
          currentTab={tab}
          setCurrentTab={setTab}
          headers={['Assignments', 'Materials', 'Announcements', 'Feedback']}
        />
        <Text color="black" marginTop={10} marginBottom={4} fontWeight={500}>
          Week 3
        </Text>
        <ContentBox title="Intro to For Loops" buttonText="Start Assignment" />
        <ContentBox title="Intro to Arrays" buttonText="Finished" />
      </Box>
    </Box>
  );
}
