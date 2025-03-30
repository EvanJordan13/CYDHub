'use client';

import Module from '@/src/components/Module';
import SideBar from '@/src/components/SideBar';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Text, Heading, Box, Image, Tabs, Button as ChakraButton, Flex, IconButton, Stack } from '@chakra-ui/react';
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
import { useState, useEffect } from 'react';
import AssignmentDescription from '@/src/components/AssignmentDescription';

type ModuleWithRelations = Mod & {
  materials: ModuleMaterial[];
  assignments: Assignment[];
};

type ResourceItem = { type: 'assignment'; data: Assignment } | { type: 'material'; data: ModuleMaterial };

export default function ProgramPage({ params }: { params: { programId: number } }) {
  const programId = Number(params.programId);
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [programAssignments, setProgramAssignments] = useState<(Assignment & { moduleTitle: string })[]>([]);
  const [programModules, setProgramModules] = useState<ModuleWithRelations[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [showMaterials, setShowMaterials] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const [showModules, setShowModules] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const handleModuleClick = (resource: ResourceItem) => {
    console.log('Resource clicked', resource);
    setSelectedResource(resource);
  };

  const testFetchProgramMaterials = async () => {
    setIsLoadingMaterials(true);
    try {
      const materials = await fetchProgramMaterials(programId);
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
      const assignments = await fetchProgramAssignments(programId);
      console.log('Program assignments', assignments);
      setProgramAssignments(assignments);
    } catch (error) {
      console.error('Error fetching program assignments:', error);
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  const testFetchProgramModules = async () => {
    setIsLoadingModules(true);
    try {
      const modules = await getProgramModules(programId);
      console.log('Program modules', modules);
      setProgramModules(modules as ModuleWithRelations[]);
    } catch (error) {
      console.error('Error fetching program modules:', error);
    } finally {
      setIsLoadingModules(false);
    }
  };

  const fetchProgramAnnouncements = async () => {
    setIsLoadingAnnouncements(true);
    try {
      const programData = await getProgramById(programId);
      const announcements = await getProgramAnnouncements(programId);
      const teacherId = programData.teacherId;
      if (!teacherId) {
        throw new Error('teacherId is null or undefined');
      }
      const userData = await getUserById(teacherId);
      console.log('Program Announcements', announcements);
      setProgramAnnouncements(announcements);
      setProgram(programData);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching program announcements:', error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    testFetchProgramMaterials();
    testFetchProgramAssignments();
    testFetchProgramModules();
    fetchProgramAnnouncements();
  }, [programId]);

  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'}>
      <SideBar page="Program" />
      <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }}>
        <Box display={'flex'} height={'28px'} justifyContent={'space-between'}>
          <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
            Web Development
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
              <Tabs.Trigger
                value="modules"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
                onClick={() => {
                  setSelectedResource(null);
                }}
              >
                <Text>Modules</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="announcements"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
                onClick={() => {
                  setSelectedResource(null);
                  fetchProgramAnnouncements();
                }}
              >
                <Text>Announcements</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="feedback"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Feedback</Text>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="modules">
              {!isLoadingMaterials && !isLoadingAssignments && !isLoadingModules ? (
                selectedResource ? (
                  selectedResource.type === 'assignment' ? (
                    <AssignmentDescription
                      assignmentNumber={selectedResource.data.assignmentNumber}
                      assignmentTitle={selectedResource.data.title}
                      dueDate={selectedResource.data.dueDate}
                      questionCount={selectedResource.data.questionCount}
                      description={selectedResource.data.description}
                    />
                  ) : (
                    // module material page
                    <></>
                  )
                ) : (
                  programModules.map((module, index) => (
                    <Module
                      key={index}
                      title={module.title}
                      materials={module.materials}
                      assignments={module.assignments}
                      onClick={handleModuleClick}
                    />
                  ))
                )
              ) : (
                <Text marginTop={10}>Loading...</Text>
              )}
            </Tabs.Content>

            <Tabs.Content value="announcements">
              <Flex direction="column" paddingTop={'16px'} paddingBottom={'16px'} gap={'32px'}>
                {!isLoadingAnnouncements &&
                  user &&
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
                  ))}
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}
