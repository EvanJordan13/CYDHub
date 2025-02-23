'use client';

import { useState } from 'react';
import CourseCard from '../../components/CourseCard';
import ContentBox from '@/src/components/ContentBox';
import SelectionPanel from '@/src/components/SelectionPanel';
import { Box, Heading } from '@chakra-ui/react';
import { Course, CourseMaterial } from '@prisma/client';

enum Tab {
  Assignments = 0,
  Materials = 1,
  Announcements = 2,
  Feedback = 3,
}

const materials: CourseMaterial[] = [
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

export default function DevPage() {
  // Mock course data
  const mockCourse: Course = {
    id: 1,
    organizationId: 100, // Foreign key reference
    title: 'Introduction to Data Science',
    description: 'A beginner-friendly course covering the fundamentals of Data Science.',
    syllabus: 'Week 1: Introduction to Python\nWeek 2: Data Wrangling\nWeek 3: Machine Learning Basics',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  };

  const [tab, setTab] = useState<Tab>(Tab.Assignments);

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6} color="black">
        Development Page
      </Heading>
      <CourseCard course={mockCourse} />
      <SelectionPanel
        currentTab={tab}
        setCurrentTab={setTab}
        headers={['Assignments', 'Materials', 'Announcements', 'Feedback']}
      />
      {materials.map((material, index) => {
        return <ContentBox buttonText="Start Assignment" material={material} key={index} />;
      })}
    </Box>
  );
}
