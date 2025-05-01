/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Text, Heading, Box, Image, Tabs, Flex, Stack, Skeleton, SkeletonText } from '@chakra-ui/react';
import SideBar from '@/src/components/dashboard/SideBar';
import AnnouncementCard from '@/src/components/AnnouncementCard';
import { getProgramAnnouncements, getProgramById, getUserById } from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod, Announcement, Program, User } from '@prisma/client';
import { Tab } from '@/src/components/dashboard/types';
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
  params: { programId: string };
}) {
  const programId = Number(params.programId);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<Program | undefined>();
  const [teacher, setTeacher] = useState<User | undefined>();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

  const fetchLayoutData = async (setLoading = true) => {
    if (!programId || isNaN(programId)) {
      console.error('Invalid programId in layout');
      setIsInitialLoading(false);
      return;
    }
    if (setLoading) setIsLoadingAnnouncements(true);
    setIsInitialLoading(true);

    try {
      const programData = await getProgramById(programId);
      setProgram(programData);

      if (!programData) throw new Error('Program not found');

      const announcements = await getProgramAnnouncements(programId);
      setProgramAnnouncements(announcements);

      const teacherId = programData.teacherId;
      if (teacherId) {
        const teacherData = await getUserById(teacherId);
        setTeacher(teacherData);
      } else {
        console.warn('Teacher ID not found for program.');
        setTeacher(undefined);
      }
    } catch (error) {
      console.error('Error fetching program layout data:', error);
      setProgram(undefined);
      setProgramAnnouncements([]);
      setTeacher(undefined);
    } finally {
      if (setLoading) setIsLoadingAnnouncements(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchLayoutData(false);
  }, [programId]);

  const handleAnnouncementsTabClick = () => {
    router.push(`/programs/${programId}/announcements`);
  };

  const handleModulesTabClick = () => {
    router.push(`/programs/${programId}`);
  };

  const handleFeedbackTabClick = () => {
    router.push(`/programs/${programId}/feedback`);
  };

  const handleDashboardTabChange = (next: Tab) => {
    router.push(`/dashboard?tab=${next}`);
  };

  const defaultTabValue = 'modules';

  return (
    <AuthWrapper>
      <Box display={'flex'} minH="100vh" backgroundColor={'white'} color={'black'}>
        <SideBar currentTab="home" onTabChange={handleDashboardTabChange} />
        {isInitialLoading ? (
          <ProgramPageSkeleton />
        ) : !program ? (
          <Box flex={1} p={8} marginLeft={250}>
            {' '}
            <Heading color="red.500">Program not found.</Heading>{' '}
          </Box>
        ) : (
          <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }} paddingX={4}>
            <Box display={'flex'} height={'28px'} justifyContent={'space-between'} alignItems="center" mb={5}>
              <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
                {program?.name || 'Program'}
              </Heading>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} alt="Streak Icon" />
                <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
                  5
                </Text>
              </Box>
            </Box>

            <Box marginTop={5} width={'96.5%'}>
              <Tabs.Root defaultValue={defaultTabValue}>
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
                    onClick={handleFeedbackTabClick}
                  >
                    <Text>Feedback</Text>
                  </Tabs.Trigger>
                </Tabs.List>

                <Box pt={4}>{modules}</Box>
              </Tabs.Root>
            </Box>
          </Box>
        )}
      </Box>
    </AuthWrapper>
  );
}
