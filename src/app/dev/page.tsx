'use client';

import { useState } from 'react';
import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Program } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import { fetchAllPrograms, fetchProgramsByUser } from '@/src/lib/query/programs';
import { Flex } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { Button as ChakraButton } from '@chakra-ui/react';

export default function DevPage() {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [userPrograms, setUserPrograms] = useState<Program[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

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

  const testFetchAllPrograms = async () => {
    setIsLoadingAll(true);
    try {
      const programs = await fetchAllPrograms();
      console.log('All programs', programs);
      setAllPrograms(programs);
    } catch (error) {
      console.error('Error fetching all programs:', error);
    } finally {
      setIsLoadingAll(false);
    }
  };

  const testFetchProgramsByUser = async () => {
    setIsLoadingUser(true);
    try {
      const programs = await fetchProgramsByUser(1);
      console.log('Programs by user', programs);
      setUserPrograms(programs);
    } catch (error) {
      console.error('Error fetching user programs:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>

      <Box mb={6}>
        <ChakraButton onClick={testFetchAllPrograms} mr={2} loading={isLoadingAll}>
          Test Fetch All Programs
        </ChakraButton>
        <ChakraButton onClick={testFetchProgramsByUser} loading={isLoadingUser}>
          Test Fetch Programs By User
        </ChakraButton>
      </Box>

      <Stack gap={4} mb={8}>
        <Box>
          <Heading size="md" mb={2}>
            All Programs ({allPrograms.length})
          </Heading>
          {allPrograms.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            User Programs ({userPrograms.length})
          </Heading>
          {userPrograms.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </Box>
      </Stack>

      <Heading size="md" mb={4}>
        Form Components Test
      </Heading>
      <TextInput label="Date of Birth" width={10} icon={<Calendar />} />
      <br />
      <TextInput label="Name" width={18.75} icon={<User />} />
      <br />
      <TextInput label="Achievement" width={25} icon={<Award />} />
      <ProgramCard program={mockProgram} />
      <Flex direction={'row'} gap={'50px'}>
        <Flex direction={'column'} gap={'20px'}>
          <Button type="primary" pageColor="flamingo" text="Primary" height="60px" width="130px" />
          <Button type="secondary" pageColor="flamingo" text="Secondary" height="60px" width="130px" />
          <Button type="disabled" pageColor="flamingo" text="Disabled" height="60px" width="130px" />
        </Flex>
        <Flex direction={'column'} gap={'20px'}>
          <Button type="primary" pageColor="aqua" text="Primary" height="60px" width="130px" />
          <Button type="secondary" pageColor="aqua" text="Secondary" height="60px" width="130px" />
          <Button type="disabled" pageColor="aqua" text="Disabled" height="60px" width="130px" />
        </Flex>
      </Flex>
    </Box>
  );
}
