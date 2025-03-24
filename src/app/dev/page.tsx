import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Program } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import { getProgramAnnouncements } from '@/src/lib/query/announcements';

export default async function DevPage() {
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

  const announcements = await getProgramAnnouncements(3);

  return (
    <Box p={8} bg="white" minH="100vh">
      <Heading mb={6}> DEV: Program Materials</Heading>

      {announcements.length === 0 ? (
        <Text>No materials found for program #1</Text>
      ) : (
        <VStack align="start" gap={4}>
          {announcements.map(a => (
            <Box key={a.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Text fontWeight="bold">{a.title}</Text>
              <Text fontSize="sm" color="gray">
                {a.content}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
