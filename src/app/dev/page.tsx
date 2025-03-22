'use client';

import { useState } from 'react';
import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Program } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import { fetchAllPrograms, fetchProgramsByUser, fetchProgramMaterials } from '@/src/lib/query/programs';
import { Flex } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ModuleMaterial } from '@prisma/client';
import { IconButton } from '@chakra-ui/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function DevPage() {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [userPrograms, setUserPrograms] = useState<Program[]>([]);
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [showAllPrograms, setShowAllPrograms] = useState(true);
  const [showUserPrograms, setShowUserPrograms] = useState(true);
  const [showMaterials, setShowMaterials] = useState(true);

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

  const testFetchProgramMaterials = async () => {
    setIsLoadingMaterials(true);
    try {
      const materials = await fetchProgramMaterials(1);
      console.log('Program materials', materials);
      setProgramMaterials(materials);
    } catch (error) {
      console.error('Error fetching program materials:', error);
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>

      <Box mb={6}>
        <ChakraButton onClick={testFetchAllPrograms} mr={2} loading={isLoadingAll}>
          Test Fetch All Programs
        </ChakraButton>
        <ChakraButton onClick={testFetchProgramsByUser} mr={2} loading={isLoadingUser}>
          Test Fetch Programs By User
        </ChakraButton>
        <ChakraButton onClick={testFetchProgramMaterials} loading={isLoadingMaterials}>
          Test Fetch Program 1 Materials
        </ChakraButton>
      </Box>

      <Flex gap={8}>
        <Flex direction="column" flex={1}>
          <Flex align="center" mb={2}>
            <Heading size="md" flex={1}>
              All Programs ({allPrograms.length})
            </Heading>
            <IconButton
              as={showAllPrograms ? ChevronUp : ChevronDown}
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              variant="ghost"
              aria-label="Toggle all programs"
              size="sm"
            />
          </Flex>
          {showAllPrograms &&
            (allPrograms.length > 0 ? (
              <Stack>
                {allPrograms.map(program => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </Stack>
            ) : (
              <Text color="gray.500">No programs found</Text>
            ))}
        </Flex>

        <Flex direction="column" flex={1}>
          <Flex align="center" mb={2}>
            <Heading size="md" flex={1}>
              User Programs ({userPrograms.length})
            </Heading>
            <IconButton
              as={showUserPrograms ? ChevronUp : ChevronDown}
              onClick={() => setShowUserPrograms(!showUserPrograms)}
              variant="ghost"
              aria-label="Toggle user programs"
              size="sm"
            />
          </Flex>
          {showUserPrograms &&
            (userPrograms.length > 0 ? (
              <Stack>
                {userPrograms.map(program => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </Stack>
            ) : (
              <Text color="gray.500">No programs by user found</Text>
            ))}
        </Flex>

        <Flex direction="column" flex={1}>
          <Flex align="center" mb={2}>
            <Heading size="md" flex={1}>
              Program 1 Materials
            </Heading>
            <IconButton
              as={showMaterials ? ChevronUp : ChevronDown}
              onClick={() => setShowMaterials(!showMaterials)}
              variant="ghost"
              aria-label="Toggle materials"
              size="sm"
            />
          </Flex>
          {showMaterials &&
            (programMaterials.length > 0 ? (
              <Stack>
                {programMaterials.map(material => (
                  <Box key={material.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                    <Text fontWeight="bold">{material.title}</Text>
                    <Text color="gray.600">Module: {material.moduleTitle}</Text>
                    <Text>Type: {material.materialType}</Text>
                    {material.fileUrl && (
                      <Text>
                        File:{' '}
                        <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                          {material.fileUrl}
                        </a>
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text color="gray.500">No materials found</Text>
            ))}
        </Flex>
      </Flex>

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
