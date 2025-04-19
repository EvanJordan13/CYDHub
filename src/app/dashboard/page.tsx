'use client';

import { useState, useEffect } from 'react';

import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';
import { getUserById } from '@/src/lib/query/users';
import { User, Assignment, Program, Announcement } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';

import { Flex, Box, Heading } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/sections/HomeSection';
import SideBar from '@/src/components/dashboard/SideBar';
import { Tab } from '@/src/components/dashboard/types';
import MoodModal from '@/src/components/MoodModal';

const MOOD_MODAL_STORAGE_KEY = 'lastMoodModalShownDate';
import TodoSection from '@/src/components/dashboard/sections/TodoSection';

export default function DashboardPage() {
  const { user: auth0User } = useAuth0User();

  const [tab, setTab] = useState<Tab>('home');
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingPageData, setIsLoadingPageData] = useState(true);
  const [dbUserId, setDbUserId] = useState<number | null>(null);

  useEffect(() => {
    if (auth0User?.email) {
      setIsLoadingPageData(true);
      setDbUserId(null);

      fetch(`/api/users/lookup?email=${encodeURIComponent(auth0User.email)}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`User lookup failed with status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data?.id) {
            setDbUserId(data.id);
          } else {
            console.error('DB User lookup failed unexpectedly after AuthWrapper checks.');
            setIsLoadingPageData(false);
          }
        })
        .catch(error => {
          console.error('Error fetching database user ID:', error);
          setIsLoadingPageData(false);
        });
    } else if (auth0User) {
      console.error('Auth0 user is missing email address.');
      setIsLoadingPageData(false);
    }
  }, [auth0User]);

  useEffect(() => {
    if (!dbUserId) {
      return;
    }

    const fetchData = async () => {
      setIsLoadingPageData(true);
      try {
        const [userInfoData, assignmentsData, programsData] = await Promise.all([
          getUserById(dbUserId),
          fetchProgramAssignmentsByUser(dbUserId),
          fetchProgramsByUser(dbUserId),
        ]);
        setUserInfo(userInfoData);
        setAssignments(assignmentsData);
        setPrograms(programsData);

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
  }, [dbUserId]);

  const tabs: Record<Tab, React.ReactNode> = {
    home: (
      <HomeSection userInfo={userInfo} assignments={assignments} programs={programs} isLoading={isLoadingPageData} />
    ),
    todo: <TodoSection assignments={assignments} points={userInfo?.points || 0} />,
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
