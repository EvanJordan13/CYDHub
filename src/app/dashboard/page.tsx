'use client';

import { useState, useEffect } from 'react';

import { getUserById } from '@/src/lib/query/users';
import { User, Assignment, Program, Announcement } from '@prisma/client';
import { fetchProgramsByUser, fetchProgramAssignmentsByUser } from '@/src/lib/query/programs';

import { Flex } from '@chakra-ui/react';
import HomeSection from '@/src/components/dashboard/HomeSection';
import SideBar from '@/src/components/SideBar';

type Tab = 'home' | 'todo' | 'editor' | 'calendar' | 'shop';

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('home');
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);

  const testUserId = 1;

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
    todo: <></>,
    editor: <></>,
    calendar: <></>,
    shop: <></>,
  };

  return (
    <Flex height="100vh" width="100vw">
      <SideBar page={tab} />
      {tabs[tab]}
    </Flex>
  );
}
