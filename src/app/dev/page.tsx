import CourseCard from '../../components/CourseCard';
import { Box, Heading } from '@chakra-ui/react';
import { Course } from '@prisma/client'; 

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

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>
      <CourseCard course={mockCourse} />
    </Box>
  );
}
