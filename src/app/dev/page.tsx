'use client';

import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import CodeEditor from '../../components/CodeEditor';
import { Box, Center, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { Program, Announcement } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import {
  fetchAllPrograms,
  fetchProgramsByUser,
  fetchProgramMaterials,
  getProgramAnnouncements,
  fetchProgramAssignments,
} from '@/src/lib/query/programs';
import { Flex } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ModuleMaterial, Assignment } from '@prisma/client';
import { IconButton } from '@chakra-ui/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import AnnouncementCard, { AnnouncementCardProps } from '@/src/components/AnnouncementCard';

import SideBar from '../../components/dashboard/SideBar';
import MoodModal from '@/src/components/MoodModal';
import { useState } from 'react';
import TodoCard from '@/src/components/dashboard/TodoCard';
import DropDownInput from '@/src/components/DropDownInput';
import DatePickerInput from '@/src/components/DatePickerInput';
import StreakCard from '@/src/components/StreakCard';

export default function DevPage() {
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [userPrograms, setUserPrograms] = useState<Program[]>([]);
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [programAssignments, setProgramAssignments] = useState<(Assignment & { moduleTitle: string })[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [showAllPrograms, setShowAllPrograms] = useState(true);
  const [showUserPrograms, setShowUserPrograms] = useState(true);
  const [showMaterials, setShowMaterials] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [showAssignments, setShowAssignments] = useState(true);

  // Open/close state for mood modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Mock course data
  const mockProgram: Program = {
    id: 1,
    name: 'Introduction to Data Science',
    subject: 'Data Science',
    description: 'A beginner-friendly course covering the fundamentals of Data Science.',
    syllabus: 'Week 1: Introduction to Python\nWeek 2: Data Wrangling\nWeek 3: Machine Learning Basics',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
    type: 'IN_PERSON',
    teacherId: 1,
    archived: null,
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

  const testFetchProgramAssignments = async () => {
    setIsLoadingAssignments(true);
    try {
      const assignments = await fetchProgramAssignments(1);
      console.log('Program assignments', assignments);
      setProgramAssignments(assignments);
    } catch (error) {
      console.error('Error fetching program assignments:', error);
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  const mockAnnouncements: AnnouncementCardProps[] = [
    {
      subject: 'Portfolio Graded',
      title: 'HTML Portfolio Graded',
      message: 'Your HTML Portfolio assignment has been graded.',
      name: 'Penguin Pants',
      avatarUrl: 'https://i.pinimg.com/736x/f3/d5/15/f3d515f1d9105545a5954fac24f27a06.jpg',
      createdAt: new Date('2025-01-25 06:56:14.46'),
      link: '/programs/1/announcements/1',
    },
    {
      subject: 'Course Update',
      title: 'New Module Posted',
      message: 'New module "CSS Fundamentals" has been released.',
      name: 'Jane Smith',
      createdAt: new Date('2025-01-14 06:56:14.46'),
      link: '/modules/2',
      avatarUrl: null,
    },
  ];

  const testFetchProgramAnnouncements = async () => {
    setIsLoadingAnnouncements(true);
    try {
      const announcements = await getProgramAnnouncements(1);
      console.log('Program Announcements', announcements);
      setProgramAnnouncements(announcements);
    } catch (error) {
      console.error('Error fetching program announcements:', error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };
  // Drop down select input
  const pronouns = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

  return (
    <Box p={8} bg={'white'} color={'black'}>
      <Heading mb={6}>Development Page</Heading>

      <CodeEditor />

      <br />
      <br />

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
        <ChakraButton onClick={testFetchProgramAnnouncements} loading={isLoadingAnnouncements}>
          Test Fetch Program 1 Announcements
        </ChakraButton>
        <ChakraButton onClick={testFetchProgramAssignments} loading={isLoadingAssignments}>
          Test Fetch Program 1 Assignments
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

        <Flex direction="column" flex={1}>
          <Flex align="center" mb={2}>
            <Heading size="md" flex={1}>
              Program 1 Assignments
            </Heading>
            <IconButton
              as={showAssignments ? ChevronUp : ChevronDown}
              onClick={() => setShowAssignments(!showAssignments)}
              variant="ghost"
              aria-label="Toggle assignments"
              size="sm"
            />
          </Flex>
          {showAssignments &&
            (programAssignments.length > 0 ? (
              <Stack>
                {programAssignments.map(assignment => (
                  <Box key={assignment.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                    <Text fontWeight="bold">{assignment.title}</Text>
                    <Text>Module: {assignment.moduleTitle}</Text>
                    <Text>Description: {assignment.description}</Text>
                    {assignment.dueDate ? <Text>Due Date: {assignment.dueDate.toString()}</Text> : <Text></Text>}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text color="gray.500">No assignment found</Text>
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
      {/* Todo Card Section */}
      <TodoCard assignments={programAssignments} />
      {/* Announcements Section */}
      <Box my={8} width={'1136px'}>
        <Heading as="h2" size="lg" mb={4}>
          Announcements
        </Heading>
        <VStack gap={'32px'} align="stretch">
          {mockAnnouncements.map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
        </VStack>
      </Box>

      <TextInput label="Date of Birth" icon={<Calendar />} />
      <br />
      <TextInput label="Name" icon={<User />} />
      <br />
      <TextInput label="Achievement" icon={<Award />} />
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
      <SideBar currentTab={'todo'} onTabChange={() => {}} />

      <ChakraButton onClick={openModal}>Open Mood Modal</ChakraButton>

      {isModalOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={999}
          onClick={closeModal}
        >
          <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1000}>
            <MoodModal onClose={closeModal} />
          </Box>
        </Box>
      )}
      <Box p={8} bg="white" minH="100vh">
        <Heading mb={6}> Program Announcements</Heading>

        {programAnnouncements.length === 0 ? (
          <Text color={'black'}>No materials found for program #1</Text>
        ) : (
          <VStack align="start" gap={4}>
            {programAnnouncements.map(a => (
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
      <br />
      <br />

      <DropDownInput
        labelText="Select Pronouns"
        helperText="Pronouns"
        options={pronouns}
        isRequired={true}
      ></DropDownInput>

      <br />

      <DatePickerInput labelText={'Birthday'} helperText={'MM/DD/YYYY'} isRequired={true}></DatePickerInput>

      <Box width={80} margin={6}>
        <StreakCard currentPoints={25} nextRewardPoints={100} />
      </Box>
    </Box>
  );
}
