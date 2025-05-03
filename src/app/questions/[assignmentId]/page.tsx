'use client';

import { Box, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { ModuleMaterial, Assignment, Module as Mod, Announcement, Program, User } from '@prisma/client';
import { useEffect } from 'react';

export default function QuestionPage({ params }: { params: { assignmentId: number } }) {
  const [programAssignment, setProgramAssignment] = useState<Assignment>({} as Assignment);

  const fetchModules = async () => {
    try {
      const assignment = await getProgramModules(assignmentId);
      setProgramAssignment(assignment as Assignment);
    } catch (error) {
      console.error('Error fetching program modules:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Reset previous states
        setProgramAssignment({} as Assignment);

        // Wait for all essential initial fetches to complete
        await Promise.all([fetchModules()]);
      } catch (error) {
        console.error('Error fetching initial program data:', error);
      }
    };

    loadInitialData();
  }); // Re-run if programId changes

  return (
    <VStack w="100%" minH="200px" alignItems="left">
      <HStack w="100%" h="20px">
        <IconButton as={X} variant="ghost" size="sm" />
        <HStack w="100%" h="20px" backgroundColor="yellow"></HStack>
      </HStack>
      <VStack w="100%" alignItems="left" padding="32px">
        <Text fontFamily="Poppins" fontSize="15px" fontWeight={500} color="Slate">
          Question: 1 out of 5
        </Text>
        <Text fontFamily="Poppins" fontSize="22px" fontWeight={700} color="Slate">
          {programAssignment?.title}
        </Text>
        <Text fontFamily="Poppins" fontSize="16px" fontWeight={500} color="Slate">
          {programAssignment?.description}
        </Text>
        <Box w="100%" h="40.3vh" backgroundColor="blue" mt="30px"></Box>
        <HStack w="100%" justifyContent="right" mt="23px">
          <Button type="secondary" pageColor="aqua" text="Back" height="60px" width="130px" />
          <Button type="primary" pageColor="aqua" text="Next" height="60px" width="130px" />
        </HStack>
      </VStack>
    </VStack>
  );
}
