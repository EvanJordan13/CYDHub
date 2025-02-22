import CourseCard from '../../components/CourseCard';
import { Box, Heading } from '@chakra-ui/react';
import { Course } from '@prisma/client';

export default function DevPage() {
  // Mock course data
  const mockCourse: Course = {
    title: 'Intro to Prisma',
    description: 'Learn how to use Prisma ORM with Next.js',
  };

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>
      <CourseCard course={mockCourse} />
    </Box>
  );
}
