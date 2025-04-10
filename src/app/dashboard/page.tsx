'use client';

import { useState, useEffect } from 'react';

import { getUserById } from '@/src/lib/query/users';
import { User, Assignment, Program, Announcement } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';

import { Flex, Box, Heading } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/HomeSection';
// import SideBar from '@/src/components/dashboard/SideBar';
import SideBar from '@/src/components/SideBar';
import { Tab } from '@/src/components/dashboard/types';

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('home');
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);

  const testUserId = 4;

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
    fetchUserInfo();
    fetchAssignments();
    fetchPrograms();
  }, []);

  const tabs: Record<Tab, React.ReactNode> = {
    home: (
      <HomeSection
        userInfo={userInfo}
        assignments={assignments}
        programs={programs}
        isLoading={isLoadingUser || isLoadingAssignments || isLoadingPrograms}
      />
    ),
    todo: (
      <>
        {' '}
        <Heading fontSize="40px" fontWeight={700} p="32px 48px 16px 48px" lineHeight={'48px'}>
          Page Under Construction!
        </Heading>
      </>
    ),
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

  return (
    <Flex height="100vh" width="100vw" position="relative">
      <Box position="fixed" height="100vh" left={0} top={0}>
        <SideBar page="Home" />
        {/* <SideBar currentTab='home' onTabChange={setTab}/> */}
      </Box>
      <Box flex={1} ml="240px" height="100vh" overflowY="auto">
        {tabs[tab]}
      </Box>
    </Flex>
  );
}
