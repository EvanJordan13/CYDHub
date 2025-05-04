'use client';

import { Box, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAssignmentByIdQuestionsAndSubmissions } from '@/src/lib/query/assignments';
import { Assignment } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function QuestionPage() {
  const { assignmentId, questionNumber } = useParams<{ assignmentId: string; questionNumber: string }>();
  const assignmentIdNumber = Number(assignmentId);

  if (Number.isNaN(assignmentIdNumber)) {
    throw new Error(`Invalid assignmentId: ${assignmentId}`);
  }

  const [programAssignment, setProgramAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const data = await getAssignmentByIdQuestionsAndSubmissions(assignmentIdNumber);
        setProgramAssignment(data as Assignment);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAssignment();
  }, [assignmentIdNumber]);

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
          {/* {programAssignment?.questions[0]?.questionText} */}
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
