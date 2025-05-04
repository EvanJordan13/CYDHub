'use client';

import { useState, useEffect, Suspense } from 'react';

import { getUserById } from '@/src/lib/query/users';
import { User, Assignment, Program, Announcement } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';

import { Flex, Box, Heading } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/sections/HomeSection';
import SideBar from '@/src/components/dashboard/SideBar';
import { Tab } from '@/src/components/dashboard/types';
import MoodModal from '@/src/components/MoodModal';

import TodoSection from '@/src/components/dashboard/sections/TodoSection';
import SettingsSection from '@/src/components/dashboard/sections/SettingsSection';
import ArchivedPage from '@/src/components/dashboard/sections/Archived';
import { useSearchParams, useRouter } from 'next/navigation';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <DashboardClient />
    </Suspense>
  );
}

function DashboardClient() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [archivedPrograms, setArchivedPrograms] = useState<Program[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isLoadingArchivedPrograms, setIsLoadingArchivedPrograms] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const searchParams = useSearchParams();

  const testUserId = 1;
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get('tab') as Tab | null;
    setTab(q ? q : 'home');
  }, [searchParams]);

  const handleTabChange = (next: Tab) => {
    setTab(next);
    router.replace(`/dashboard?tab=${next}`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoadingUser(true);
      try {
        const userInfo = await getUserById(testUserId);
        setUserInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    const fetchAssignments = async () => {
      setIsLoadingAssignments(true);
      try {
        const assignments = await fetchProgramAssignmentsByUser(testUserId);
        setAssignments(assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setIsLoadingAssignments(false);
      }
    };
    const fetchPrograms = async () => {
      setIsLoadingPrograms(true);
      try {
        const programs = await fetchProgramsByUser(testUserId);
        setPrograms(programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoadingPrograms(false);
      }
    };
    const fetchArchivedPrograms = async () => {
      setIsLoadingArchivedPrograms(true);
      try {
        const archivedProgs = await fetchProgramsByUser(testUserId, true);
        setArchivedPrograms(archivedProgs);
      } catch (error) {
        console.error('Error fetching archived programs:', error);
      } finally {
        setIsLoadingArchivedPrograms(false);
      }
    };
    fetchUserInfo();
    fetchAssignments();
    fetchPrograms();
    fetchArchivedPrograms();
  }, []);

  useEffect(() => {
    const key = 'dashboardModalShown';
    if (!sessionStorage.getItem(key)) {
      setIsOpenModal(true);
      sessionStorage.setItem(key, 'true');
    }
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUserInfo(updatedUser);
  };

  if (tab === null) return null;
  const tabs: Record<Tab, React.ReactNode> = {
    home: (
      <HomeSection
        userInfo={userInfo}
        assignments={assignments}
        programs={programs}
        isLoading={isLoadingUser || isLoadingAssignments || isLoadingPrograms}
      />
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
      <ArchivedPage userInfo={userInfo} archivedPrograms={archivedPrograms} isLoading={isLoadingArchivedPrograms} />
    ),
    settings: (
      <>
        <SettingsSection userInfo={userInfo} onUserUpdate={handleUserUpdate} />
      </>
    ),
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Flex height="100vh" width="100vw" position="relative">
      <Box position="fixed" height="100vh" left={0} top={0}>
        <SideBar currentTab={tab} onTabChange={handleTabChange} />
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
