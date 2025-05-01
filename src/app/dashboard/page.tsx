'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useDbSession } from '@/src/hooks/useDbSession';
import { Assignment, Program } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';
import { Flex, Box, Heading, Center, Spinner, Text, Skeleton } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/sections/HomeSection';
import SideBar from '@/src/components/dashboard/SideBar';
import { Tab } from '@/src/components/dashboard/types';
import MoodModal from '@/src/components/MoodModal';
import TodoSection from '@/src/components/dashboard/sections/TodoSection';
import ArchivedPage from '@/src/components/dashboard/sections/Archived';
import { useSearchParams, useRouter } from 'next/navigation';

function DashboardLoadingSkeleton({ message }: { message?: string }) {
  return (
    <Center h="100vh" flexDirection="column">
      <Spinner size="xl" color="Aqua" />
      {message && <Text mt={4}>{message}</Text>}
    </Center>
  );
}

function DashboardClient() {
  const { dbUser } = useDbSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [archivedPrograms, setArchivedPrograms] = useState<Program[]>([]);
  const [isLoadingPageData, setIsLoadingPageData] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get('tab') as Tab | null;
    const validTabs = ['home', 'todo', 'editor', 'calendar', 'shop', 'archived', 'settings'];
    if (q && validTabs.includes(q)) {
      if (tab !== q) setTab(q);
    } else if (!q || (q && !validTabs.includes(q))) {
      if (tab !== 'home') {
        setTab('home');
      }
    }
  }, [searchParams, tab, router]);

  const handleTabChange = (next: Tab) => {
    setTab(next);
    router.replace(`/dashboard?tab=${next}`, { scroll: false });
  };

  useEffect(() => {
    if (!dbUser?.id) {
      setIsLoadingPageData(true);
      return;
    }

    const userId = dbUser.id;
    let isMounted = true;

    const fetchAllData = async () => {
      setIsLoadingPageData(true);
      try {
        const [assignmentsData, programsData, archivedProgramsData] = await Promise.all([
          fetchProgramAssignmentsByUser(userId),
          fetchProgramsByUser(userId),
          fetchProgramsByUser(userId, true),
        ]);

        if (isMounted) {
          setAssignments(assignmentsData);
          setPrograms(programsData);
          setArchivedPrograms(archivedProgramsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (isMounted) {
          setAssignments([]);
          setPrograms([]);
          setArchivedPrograms([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingPageData(false);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [dbUser?.id]);

  useEffect(() => {
    const key = 'dashboardModalShown';
    if (!sessionStorage.getItem(key)) {
      setIsOpenModal(true);
      sessionStorage.setItem(key, 'true');
    }
  }, []);

  const tabs = useMemo(
    () => ({
      home: <HomeSection userInfo={dbUser} assignments={assignments} programs={programs} />,
      todo: <TodoSection assignments={assignments} points={dbUser?.points || 0} />,
      editor: (
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Editor Under Construction!
        </Heading>
      ),
      calendar: (
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Calendar Under Construction!
        </Heading>
      ),
      shop: (
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Shop Under Construction!
        </Heading>
      ),
      archived: <ArchivedPage userInfo={dbUser} archivedPrograms={archivedPrograms} isLoading={isLoadingPageData} />,
      settings: (
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Settings Under Construction!
        </Heading>
      ),
    }),
    [dbUser, assignments, programs, archivedPrograms, isLoadingPageData],
  );

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Flex height="100vh" width="100vw" position="relative">
      <Box position="fixed" height="100vh" left={0} top={0} zIndex={10}>
        <SideBar currentTab={tab} onTabChange={handleTabChange} />
      </Box>
      <Box flex={1} ml="210px" height="100vh" overflowX="hidden" overflowY="auto" bg="gray.50">
        {isLoadingPageData ? (
          <Center h="calc(100vh - 100px)">
            <Spinner size="xl" color="Aqua" />
          </Center>
        ) : (
          (tabs[tab] ?? <Heading p={8}>Invalid Tab</Heading>)
        )}
      </Box>

      {isOpenModal && (
        <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0, 0, 0, 0.5)" zIndex={999}>
          <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1000}>
            <MoodModal onClose={closeModal} />
          </Box>
        </Box>
      )}
    </Flex>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton message="Loading dashboard..." />}>
      <DashboardClient />
    </Suspense>
  );
}
