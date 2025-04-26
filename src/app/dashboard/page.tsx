'use client';

import { useState, useEffect } from 'react';
import { useDbSession } from '@/src/hooks/useDbSession';
import { User as DbUser, Assignment, Program } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';

import { Flex, Box, Heading } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/sections/HomeSection';
import SideBar from '@/src/components/dashboard/SideBar';
import { Tab } from '@/src/components/dashboard/types';
import MoodModal from '@/src/components/MoodModal';

const MOOD_MODAL_STORAGE_KEY = 'lastMoodModalShownDate';
import TodoSection from '@/src/components/dashboard/sections/TodoSection';

export default function DashboardPage() {
  const { dbUser, isLoading: isSessionLoading, error: sessionError } = useDbSession();

  const [tab, setTab] = useState<Tab>('home');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingPageData, setIsLoadingPageData] = useState(true);

  useEffect(() => {
    // Ensure session is loaded and we have a dbUser before fetching page data
    if (isSessionLoading || !dbUser) {
      setIsLoadingPageData(true);
      return;
    }

    // Check if page data is already loaded to prevent redundant fetches
    if (assignments.length > 0 || programs.length > 0) {
      setIsLoadingPageData(false);
      return;
    }

    const fetchData = async () => {
      setIsLoadingPageData(true);
      try {
        const [assignmentsData, programsData] = await Promise.all([
          fetchProgramAssignmentsByUser(dbUser.id),
          fetchProgramsByUser(dbUser.id),
        ]);
        setAssignments(assignmentsData);
        setPrograms(programsData);

        //Mood Modal
        const todayDateString = new Date().toDateString();
        const lastShownDate = localStorage.getItem(MOOD_MODAL_STORAGE_KEY);

        if (lastShownDate !== todayDateString) {
          setIsOpenModal(true);
          localStorage.setItem(MOOD_MODAL_STORAGE_KEY, todayDateString);
        } else {
          setIsOpenModal(false);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoadingPageData(false);
      }
    };

    fetchData();
  }, [dbUser, isSessionLoading]);

  const tabs: Record<Tab, React.ReactNode> = {
    home: <HomeSection userInfo={dbUser} assignments={assignments} programs={programs} isLoading={isLoadingPageData} />,
    todo: <TodoSection assignments={assignments} points={dbUser?.points || 0} />,
    editor: (
      <>
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
    calendar: (
      <>
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
    shop: (
      <>
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
    archived: (
      <>
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
    settings: (
      <>
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Flex height="100vh" width="100vw" position="relative">
      <Box position="fixed" height="100vh" left={0} top={0}>
        <SideBar currentTab={tab} onTabChange={setTab} />
      </Box>
      <Box flex={1} ml="210px" height="100vh" overflowX="visible" overflowY="auto">
        {tabs[tab]}
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
