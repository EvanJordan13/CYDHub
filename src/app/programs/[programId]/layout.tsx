'use client';

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
import { getProgramAnnouncements, getProgramById, getUserById } from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod, Announcement, Program, User } from '@prisma/client';
import { useState, useEffect } from 'react';
import { MoveDiagonal } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function ProgramLayout({
  modules,
  params,
}: {
  modules: React.ReactNode;
  params: { programId: number };
}) {
  const programId = Number(params.programId);
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [programAssignments, setProgramAssignments] = useState<(Assignment & { moduleTitle: string })[]>([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const router = useRouter();

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

      try {
        // Reset previous states
        setProgramAnnouncements([]);
        setProgram(undefined);
        setUser(undefined);

        // Wait for all essential initial fetches to complete
        await fetchAnnouncementsAndProgram(false);
      } catch (error) {
        console.error('Error fetching initial program data:', error);
      } finally {
        setIsInitialLoading(false); // Finish overall loading
      }
    };

    loadInitialData();
  }, [programId]); // Re-run if programId changes

  const handleAnnouncementsTabClick = () => {
    // Fetch only if data isn't present and not already loading specifically for the tab

    router.push(`/programs/${programId}`);

    if (programAnnouncements.length === 0 && !isLoadingAnnouncements) {
      fetchAnnouncementsAndProgram(true);
    }
  };

  const handleModulesTabClick = () => {
    router.push(`/programs/${programId}`);
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
                <Tabs.Trigger
                  value="modules"
                  _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                  onClick={handleModulesTabClick}
                >
                  <Text>Modules</Text>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="announcements"
                  _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                  onClick={handleAnnouncementsTabClick}
                >
                  <Text>Announcements</Text>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="feedback"
                  _selected={{ color: 'Aqua', fontWeight: '700', borderBottom: '4px solid #4D80BB' }}
                  onClick={() => {
                    router.push(`/programs/${programId}`);
                  }}
                >
                  <Text>Feedback</Text>
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="modules">{modules}</Tabs.Content>

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
    </Box>
  );
}
