'use client';

import SideBar from '@/src/components/dashboard/SideBar';
import {
  createListCollection,
  Portal,
  Select,
  Text,
  Heading,
  Box,
  Image,
  Tabs,
  Flex,
  Stack,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import AnnouncementCard from '@/src/components/AnnouncementCard';
import { getProgramAnnouncements, getProgramById, getUserById } from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod, Announcement, Program, User } from '@prisma/client';
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Tab } from '@/src/components/dashboard/types';
import FeedbackForm from '@/src/components/FeedbackForm';
import AuthWrapper from '@/src/components/AuthWrapper';
import { ChevronDown } from 'lucide-react';
import { useDbSession } from '@/src/hooks/useDbSession';

const ProgramPageSkeleton = () => (
  <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }} paddingX={4} mt={10}>
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

type ModuleWithRelations = Mod & {
  materials: ModuleMaterial[];
  assignments: Assignment[];
};

type ResourceItem = { type: 'assignment'; data: Assignment } | { type: 'material'; data: ModuleMaterial };

type ModuleViewContextType = {
  showAssignments: boolean;
  showMaterials: boolean;
  setView: (type: 'assignments' | 'materials' | 'both') => void;
};

const ModuleViewContext = createContext<ModuleViewContextType | undefined>(undefined);

export function useModuleView() {
  const context = useContext(ModuleViewContext);
  if (!context) {
    throw new Error('useModuleView must be used within ModuleViewProvider');
  }
  return context;
}

export default function ProgramLayout({
  modules,
  params,
}: {
  modules: React.ReactNode;
  params: { programId: number };
}) {
  const programId = Number(params.programId);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [teacher, setTeacher] = useState<User | undefined>();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [modulesTabTitle, setModulesTabTitle] = useState('Modules');
  const [view, setView] = useState<'assignments' | 'materials' | 'both'>('both');
  const router = useRouter();
  const { dbUser } = useDbSession();

  const showAssignments = view === 'assignments' || view === 'both';
  const showMaterials = view === 'materials' || view === 'both';

  const contextValue = {
    showAssignments,
    showMaterials,
    setView,
  };

  const frameworks = createListCollection({
    items: [
      { label: 'Assignments', value: 'assignments' },
      { label: 'Materials', value: 'materials' },
      { label: 'Both', value: 'both' },
    ],
  });

  const fetchLayoutAndAnnouncementsData = async () => {
    setIsLoadingAnnouncements(true);
    setProgramAnnouncements([]);
    setTeacher(undefined);

    try {
      const programData = await getProgramById(programId);
      setProgram(programData);

      if (!programData) throw new Error('Program not found');

      const [announcements, teacherData] = await Promise.all([
        getProgramAnnouncements(programId),
        programData.teacherId ? getUserById(programData.teacherId) : Promise.resolve(undefined),
      ]);

      setProgramAnnouncements(announcements);
      setTeacher(teacherData);
    } catch (error) {
      console.error('Error fetching layout/announcements data:', error);
      setProgram(undefined);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      await fetchLayoutAndAnnouncementsData();
      setIsInitialLoading(false);
    };

    if (programId && !isNaN(programId)) {
      loadInitialData();
    } else {
      console.error('Invalid programId received:', params.programId);
      setIsInitialLoading(false);
      setProgram(undefined);
    }
  }, [programId]);

  const handleTabChange = (next: Tab) => {
    router.push(`/dashboard?tab=${next}`);
  };

  const handleModulesTabClick = () => {
    setSelectedResource(null);
  };

  const changeResourcesShown = (value: string) => {
    const newView = value as 'assignments' | 'materials' | 'both';
    setView(newView);
    setModulesTabTitle(newView === 'assignments' ? 'Assignments' : newView === 'materials' ? 'Materials' : 'Modules');
  };

  return (
    <AuthWrapper>
      <ModuleViewContext.Provider value={contextValue}>
        <Box display={'flex'} minH={'100vh'} backgroundColor={'white'} color={'black'}>
          <SideBar currentTab="home" onTabChange={handleTabChange} />
          {isInitialLoading ? (
            <ProgramPageSkeleton />
          ) : !program ? (
            <Box flex={1} p={8} marginLeft={250}>
              <Heading color="red.500">Program not found.</Heading>
            </Box>
          ) : (
            <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }} paddingX={4} mt={10}>
              <Box display={'flex'} height={'28px'} justifyContent={'space-between'} alignItems="center">
                <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
                  {program.name}
                </Heading>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                  <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} alt="Streak Icon" />
                  <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
                    {dbUser?.points}
                  </Text>
                </Box>
              </Box>

              <Box marginTop={5} width={'96.5%'}>
                <Tabs.Root defaultValue="modules">
                  <Tabs.List>
                    <Tabs.Trigger
                      value="modules"
                      _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                      onClick={handleModulesTabClick}
                    >
                      {/* <Text>Modules</Text> */}
                      <Select.Root
                        collection={frameworks}
                        size="sm"
                        onChange={(e: React.FormEvent<HTMLDivElement>) =>
                          changeResourcesShown((e.target as HTMLSelectElement).value)
                        }
                        positioning={{ placement: 'bottom', offset: { crossAxis: -35 } }}
                      >
                        <Select.HiddenSelect />
                        <Box display="flex" justifyContent={'space-evenly'} alignItems={'center'} height={5}>
                          {' '}
                          {/* alignItems={'flex-end'} */}
                          <Select.Label paddingLeft={2}>{modulesTabTitle}</Select.Label>
                          <Select.Trigger width={10} borderColor="transparent">
                            <ChevronDown />
                          </Select.Trigger>
                        </Box>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content width={36}>
                              {frameworks.items.map(framework => (
                                <Select.Item item={framework} key={framework.value}>
                                  {framework.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="announcements"
                      _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                    >
                      <Text>Announcements</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="feedback"
                      _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                    >
                      <Text>Feedback</Text>
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="modules">{modules}</Tabs.Content>

                  <Tabs.Content value="announcements">
                    <Flex direction="column" paddingTop={'16px'} paddingBottom={'16px'} gap={'32px'}>
                      {isLoadingAnnouncements ? (
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
                      ) : programAnnouncements.length > 0 ? (
                        programAnnouncements.map(a => (
                          <AnnouncementCard
                            key={a.id}
                            subject={program?.name || ''}
                            title={a.title}
                            message={a.content}
                            name={teacher?.name || 'Instructor'}
                            avatarUrl={teacher?.avatarUrl || null}
                            createdAt={new Date(a.createdAt)}
                          />
                        ))
                      ) : (
                        <Text>No announcements found.</Text>
                      )}
                    </Flex>
                  </Tabs.Content>

                  <Tabs.Content value="feedback">
                    <FeedbackForm programId={programId} userId={1} points={52} />
                  </Tabs.Content>
                </Tabs.Root>
              </Box>
            </Box>
          )}
        </Box>
      </ModuleViewContext.Provider>
    </AuthWrapper>
  );
}
