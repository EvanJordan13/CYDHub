'use client';

import AssignmentDetail from '@/src/components/AssignmentDetail';
import MaterialDetail from '@/src/components/MaterialDetail';
import Module from '@/src/components/Module';
import SideBar from '@/src/components/SideBar';
import {
  Text,
  Heading,
  Box,
  Image,
  Tabs,
  Button as ChakraButton,
  Flex,
  Stack,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import AnnouncementCard from '@/src/components/AnnouncementCard';
import {
  fetchProgramMaterials,
  fetchProgramAssignments,
  getProgramModules,
  getProgramAnnouncements,
  getProgramById,
  getUserById,
} from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod, Announcement, Program, User } from '@prisma/client';
import { useState, useEffect, useRef } from 'react';
import DreamBuddy from '@/src/components/dreambuddy/DreamBuddy';

type ModuleWithRelations = Mod & {
  materials: ModuleMaterial[];
  assignments: Assignment[];
};

type ResourceItem = { type: 'assignment'; data: Assignment } | { type: 'material'; data: ModuleMaterial };

const ProgramPageSkeleton = () => (
  <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }} paddingX={4}>
    {' '}
    <Flex height={'35px'} justifyContent={'space-between'} alignItems="center" mb={5}>
      <Skeleton height="35px" width="clamp(200px, 30%, 400px)" />
      <Skeleton height="35px" width="80px" />
    </Flex>
    <Skeleton height="40px" width="clamp(250px, 40%, 350px)" mb={6} />
    <Stack gap={6}>
      {[...Array(3)].map((_, i) => (
        <Box key={i} padding="5" boxShadow="md" bg="white" borderWidth="1px" borderRadius="lg">
          <Skeleton height="20px" width="45%" mb="4" />
          <SkeletonText mt="4" noOfLines={3} gap="4" height="12px" />
        </Box>
      ))}
    </Stack>
  </Box>
);

export default function ProgramPage({ params }: { params: { programId: number } }) {
  const programId = Number(params.programId);
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [programAssignments, setProgramAssignments] = useState<(Assignment & { moduleTitle: string })[]>([]);
  const [programModules, setProgramModules] = useState<ModuleWithRelations[]>([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const [isDreamBuddyVisible, setIsDreamBuddyVisible] = useState(false);
  const [hasDreamBuddyShown, setHasDreamBuddyShown] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const handleModuleClick = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsDreamBuddyVisible(true);
    if (!hasDreamBuddyShown) setHasDreamBuddyShown(true);
  };

  const fetchMaterials = async () => {
    setIsLoadingMaterials(true);
    try {
      const materials = await fetchProgramMaterials(programId);
      console.log('Program materials', materials);
      setProgramMaterials(materials);
    } catch (error) {
      console.error('Error fetching program materials:', error);
      throw error;
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  const fetchAssignments = async () => {
    setIsLoadingAssignments(true);
    try {
      const assignments = await fetchProgramAssignments(programId);
      setProgramAssignments(assignments);
    } catch (error) {
      console.error('Error fetching program assignments:', error);
      throw error;
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  const fetchModules = async () => {
    setIsLoadingModules(true);
    try {
      const modules = await getProgramModules(programId);
      setProgramModules(modules as ModuleWithRelations[]);
    } catch (error) {
      console.error('Error fetching program modules:', error);
      throw error;
    } finally {
      setIsLoadingModules(false);
    }
  };

  const fetchAnnouncementsAndProgram = async (setLoading = true) => {
    if (setLoading) setIsLoadingAnnouncements(true); // Controls skeleton within announcement tab
    try {
      // Fetch program, announcements, and user data concurrently where possible
      const programData = await getProgramById(programId);
      setProgram(programData); // Set program data early for title potentially

      if (!programData) throw new Error('Program not found');

      const announcements = await getProgramAnnouncements(programId);
      setProgramAnnouncements(announcements);

      const teacherId = programData.teacherId;
      if (!teacherId) {
        console.warn('Teacher ID not found for program, user data will be unavailable.');
        setUser(undefined);
      } else {
        const userData = await getUserById(teacherId);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching program/announcements/user:', error);
      if (setLoading) throw error; // Only re-throw if part of initial load
    } finally {
      if (setLoading) setIsLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true); // Start overall loading
      setSelectedResource(null);

      try {
        // Reset previous states
        setProgramModules([]);
        setProgramAnnouncements([]);
        setProgram(undefined);
        setUser(undefined);

        // Wait for all essential initial fetches to complete
        await Promise.all([fetchMaterials(), fetchAssignments(), fetchModules(), fetchAnnouncementsAndProgram(false)]);
      } catch (error) {
        console.error('Error fetching initial program data:', error);
      } finally {
        setIsInitialLoading(false); // Finish overall loading
      }
    };

    loadInitialData();
  }, [programId]); // Re-run if programId changes

  const handleAnnouncementsTabClick = () => {
    setSelectedResource(null);
    setIsDreamBuddyVisible(false);
    if (programAnnouncements.length === 0 && !isLoadingAnnouncements) {
      fetchAnnouncementsAndProgram(true);
    }
  };

  const handleModulesTabClick = () => {
    setSelectedResource(null);
    setIsDreamBuddyVisible(false);
  };

  const handleFeedbackTabClick = () => {
    setSelectedResource(null);
    setIsDreamBuddyVisible(false);
  };

  const outlineStyle = {
    color: 'Aqua',
    fontWeight: '700',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '4px',
      backgroundColor: '#4D80BB',
      boxShadow: 'none',
      transform: 'scaleX(1)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease-in-out',
    },
  };

  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'}>
      <SideBar page="Program" />
      {isInitialLoading ? (
        <ProgramPageSkeleton />
      ) : (
        <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }}>
          <Box display={'flex'} height={'28px'} justifyContent={'space-between'} alignItems="center">
            <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
              {program?.name || 'Program'}
            </Heading>

            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} />
              <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
                5
              </Text>
            </Box>
          </Box>
          <Box marginTop={5} width={'96.5%'}>
            <Tabs.Root defaultValue="modules">
              <Tabs.List>
                <Tabs.Trigger value="modules" _selected={outlineStyle} onClick={handleModulesTabClick}>
                  <Text>Modules</Text>
                </Tabs.Trigger>
                <Tabs.Trigger value="announcements" _selected={outlineStyle} onClick={handleAnnouncementsTabClick}>
                  <Text>Announcements</Text>
                </Tabs.Trigger>
                <Tabs.Trigger value="feedback" _selected={outlineStyle} onClick={handleFeedbackTabClick}>
                  <Text>Feedback</Text>
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="modules">
                {selectedResource ? (
                  selectedResource.type === 'assignment' ? (
                    <AssignmentDetail
                      assignmentNumber={selectedResource.data.assignmentNumber}
                      assignmentTitle={selectedResource.data.title}
                      dueDate={selectedResource.data.dueDate}
                      questionCount={selectedResource.data.questionCount}
                      description={selectedResource.data.description}
                    />
                  ) : (
                    <MaterialDetail
                      title={selectedResource.data.title}
                      overview={selectedResource.data.overview}
                      materialType={selectedResource.data.materialType}
                      fileUrl={selectedResource.data.fileUrl}
                      fileName={selectedResource.data.fileName}
                    />
                  )
                ) : programModules.length > 0 ? (
                  programModules.map((module, index) => (
                    <Module
                      key={index}
                      title={module.title}
                      materials={module.materials}
                      assignments={module.assignments}
                      onClick={handleModuleClick}
                    />
                  ))
                ) : (
                  <Text mt={4}>No modules found.</Text>
                )}
              </Tabs.Content>

              <Tabs.Content value="announcements">
                <Flex direction="column" paddingTop={'16px'} paddingBottom={'16px'} gap={'32px'}>
                  {isLoadingAnnouncements ? (
                    // Skeleton specifically for announcements list
                    [...Array(2)].map((_, i) => (
                      <Box key={i} padding="6" boxShadow="md" bg="white" borderWidth="1px" borderRadius="lg">
                        <Flex>
                          <Skeleton boxSize="10" borderRadius="full" mr="4" />
                          <Box flex="1">
                            <Skeleton height="16px" width="30%" mb="2" />
                            <Skeleton height="18px" width="65%" mb="4" />
                            <SkeletonText mt="2" noOfLines={3} gap="3" height="12px" />
                          </Box>
                        </Flex>
                      </Box>
                    ))
                  ) : // Render actual announcements or empty/error state
                  user && programAnnouncements.length > 0 ? (
                    programAnnouncements.map(a => (
                      <AnnouncementCard
                        key={a.id}
                        subject={program ? program.name : ''}
                        title={a.title}
                        message={a.content}
                        name={user.name ? user.name : ''}
                        avatarUrl={user.avatarUrl}
                        createdAt={a.createdAt}
                        link="/"
                      />
                    ))
                  ) : !user && programAnnouncements.length > 0 ? (
                    <Text>Could not load announcer details.</Text>
                  ) : (
                    <Text>No announcements found.</Text>
                  )}
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="feedback">
                <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
                  Page Under Construction!
                </Heading>
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Box>
      )}
      {!isInitialLoading && hasDreamBuddyShown && (
        <DreamBuddy isVisible={isDreamBuddyVisible} onHide={() => setIsDreamBuddyVisible(false)} />
      )}
    </Box>
  );
}
