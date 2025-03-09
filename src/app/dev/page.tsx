import ProgramCard from '../../components/ProgramCard';
import SideBar from '../../components/SideBar';
import { Box, Heading } from '@chakra-ui/react';
import { Program } from '@prisma/client';

export default function DevPage() {
  // Mock course data
  const mockProgram: Program = {
    id: 1,
    name: 'Introduction to Data Science',
    description: 'A beginner-friendly course covering the fundamentals of Data Science.',
    syllabus: 'Week 1: Introduction to Python\nWeek 2: Data Wrangling\nWeek 3: Machine Learning Basics',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
    type: 'IN_PERSON',
    teacherId: null,
  };

  return (
    <Box bg={'white'}>
      <SideBar page="To Do" />
    </Box>
  );
}
