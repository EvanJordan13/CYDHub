import CourseCard from '../../components/CourseCard';
import TextInput from '../../components/TextInput';
import { Box, Heading } from '@chakra-ui/react';
import { Course } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';

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
      <TextInput label="Date of Birth" width={10} icon={<Calendar />} />
      <br />
      <TextInput label="Name" width={18.75} icon={<User />} />
      <br />
      <TextInput label="Achievement" width={25} icon={<Award />} />
    </Box>
  );
}
