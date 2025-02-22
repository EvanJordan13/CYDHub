import CourseCard from '../../components/CourseCard';
import { Box, Heading } from '@chakra-ui/react';
import { Course } from '@prisma/client';

export default function DevPage() {
  // Mock course data
  const mockCourse: Course = {
    id: 1,
    name: 'Intro to Prisma',
    description: 'Learn how to use Prisma ORM with Next.js',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-06-01'),
  };

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>
      <CourseCard course={mockCourse} />
    </Box>
  );
}
