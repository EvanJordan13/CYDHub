'use client';

import { useState } from 'react';
import ContentBox from '@/src/components/ContentBox';
import { Box, Text } from '@chakra-ui/react';
import SelectionPanel from '@/src/components/SelectionPanel';
import { CourseMaterial } from '@prisma/client';

enum Tab {
  Assignments = 0,
  Materials = 1,
  Announcements = 2,
  Feedback = 3,
}

const materials = [
  {
    id: 7,
    courseId: 1,
    title: 'Syllabus',
    content: 'Detailed syllabus content for Programming 101.',
    materialType: 'FILE',
    fileUrl: 'https://example.com/programming101/syllabus.pdf',
    order: 1,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
  {
    id: 8,
    courseId: 1,
    title: 'Lecture Slides',
    content: 'Slides for week 1 lecture on Programming 101.',
    materialType: 'SLIDES',
    fileUrl: 'https://example.com/programming101/lecture1.pdf',
    order: 2,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
  {
    id: 9,
    courseId: 2,
    title: 'Coding Guidelines',
    content: 'Best practices document for coding.',
    materialType: 'FILE',
    fileUrl: 'https://example.com/codingbest/coding_guidelines.pdf',
    order: 1,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
  {
    id: 10,
    courseId: 3,
    title: 'HTML Tutorial',
    content: 'Introduction to HTML.',
    materialType: 'URL',
    fileUrl: 'https://example.com/html-tutorial',
    order: 1,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
  {
    id: 11,
    courseId: 4,
    title: 'JS Patterns',
    content: 'Advanced JavaScript patterns.',
    materialType: 'FILE',
    fileUrl: 'https://example.com/js-deep/js_patterns.pdf',
    order: 1,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
  {
    id: 12,
    courseId: 5,
    title: 'Data Science Overview',
    content: 'Overview of data science concepts.',
    materialType: 'NOTES',
    fileUrl: 'https://example.com/datascience/overview.pdf',
    order: 1,
    createdAt: '2025-02-19 21:40:05.172',
    updatedAt: '2025-02-19 21:40:05.172',
  },
];

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
        {materials.map((material, index) => {
          return <ContentBox buttonText="Start Assignment" material={material} key={index} />;
        })}
      </Box>
    </Box>
  );
}
