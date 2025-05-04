'use client';

import SideBar from '@/src/components/dashboard/SideBar';
import { Text, Heading, Box, Image, Tabs, Flex, Stack, Skeleton, SkeletonText } from '@chakra-ui/react';
import AnnouncementCard from '@/src/components/AnnouncementCard';
import { getProgramAnnouncements, getProgramById, getUserById } from '@/src/lib/query/programs';
import { Announcement, Program, User } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tab } from '@/src/components/dashboard/types';
import FeedbackForm from '@/src/components/FeedbackForm';
import AuthWrapper from '@/src/components/AuthWrapper';

const ProgramPageSkeleton = () => (
  <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }} paddingX={4}>
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
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [teacher, setTeacher] = useState<User | undefined>();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

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

  return (
    <AuthWrapper>
      <Box display={'flex'} minH={'100vh'} backgroundColor={'white'} color={'black'}>
        <style jsx global>{`
          [data-orientation='horizontal'][aria-selected='true'] {
            --indicator-color-fallback: transparent !important;
            --indicator-color: transparent !important;
            --indicator-offset-y: 0px !important;
          }
        `}</style>
        <SideBar currentTab="home" onTabChange={handleTabChange} />
        {isInitialLoading ? (
          <ProgramPageSkeleton />
        ) : !program ? (
          <Box flex={1} p={8} marginLeft={250}>
            <Heading color="red.500">Program not found.</Heading>
          </Box>
        ) : (
          <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }}>
            <Box display={'flex'} height={'28px'} justifyContent={'space-between'} alignItems="center">
              <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
                {program.name}
              </Heading>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} alt="Streak Icon" />
                <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
                  ?
                </Text>
              </Box>
            </Box>

            <Box marginTop={5} width={'96.5%'}>
              <Tabs.Root defaultValue="modules">
                <Tabs.List
                  borderBottom="none"
                  style={
                    {
                      '--indicator-color-fallback': 'transparent',
                      '--indicator-color': 'transparent',
                      '--indicator-offset-y': '0px',
                    } as React.CSSProperties
                  }
                >
                  <Tabs.Trigger
                    value="modules"
                    _selected={{
                      color: 'Aqua',
                      fontWeight: '700',
                      position: 'relative',
                      _after: {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        height: '3px',
                        backgroundColor: '#4D80BB',
                        transition: 'width 0.3s ease-in-out',
                      },
                    }}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '3px',
                      backgroundColor: '#4D80BB',
                      transition: 'width 0.3s ease-in-out',
                    }}
                    borderBottom="none"
                    boxShadow="none"
                    outline="none"
                    _focus={{ outline: 'none' }}
                  >
                    <Text>Modules</Text>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="announcements"
                    _selected={{
                      color: 'Aqua',
                      fontWeight: '700',
                      position: 'relative',
                      _after: {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        height: '3px',
                        backgroundColor: '#4D80BB',
                        transition: 'width 0.3s ease-in-out',
                      },
                    }}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '3px',
                      backgroundColor: '#4D80BB',
                      transition: 'width 0.3s ease-in-out',
                    }}
                    borderBottom="none"
                    boxShadow="none"
                    outline="none"
                    _focus={{ outline: 'none' }}
                  >
                    <Text>Announcements</Text>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="feedback"
                    _selected={{
                      color: 'Aqua',
                      fontWeight: '700',
                      position: 'relative',
                      _after: {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        height: '3px',
                        backgroundColor: '#4D80BB',
                        transition: 'width 0.3s ease-in-out',
                      },
                    }}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '3px',
                      backgroundColor: '#4D80BB',
                      transition: 'width 0.3s ease-in-out',
                    }}
                    borderBottom="none"
                    boxShadow="none"
                    outline="none"
                    _focus={{ outline: 'none' }}
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
    </AuthWrapper>
  );
}
