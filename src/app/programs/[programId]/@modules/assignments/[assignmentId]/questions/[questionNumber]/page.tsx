'use client';

import { Box, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAssignmentByIdQuestionsAndSubmissions, getAssignmentById } from '@/src/lib/query/assignments';
import { Assignment, AssignmentQuestion } from '@prisma/client';
import { useParams } from 'next/navigation';
import ProgressBar from '@/src/components/ProgressBar';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/src/components/CodeEditor';
import TextInput from '@/src/components/TextInput';

export default function QuestionPage() {
  const { programId, assignmentId, questionNumber } = useParams<{
    programId: string;
    assignmentId: string;
    questionNumber: string;
  }>();
  const programIdNumber = Number(programId);
  const assignmentIdNumber = Number(assignmentId);
  const questionNumberNumber = Number(questionNumber);
  const router = useRouter();

  if (Number.isNaN(assignmentIdNumber)) {
    throw new Error(`Invalid assignmentId: ${assignmentId}`);
  }

  const [programAssignment, setProgramAssignment] = useState<Assignment | null>(null);
  const [assignmentQuestions, setAssignmentQuestions] = useState<AssignmentQuestion[] | null>(null);
  const [assignmentQuestionsLength, setAssignmentQuestionsLength] = useState<number>(0);

  const handleNextButton = () => {
    if (questionNumberNumber >= assignmentQuestionsLength - 1) {
      return;
    }
    router.push(`/programs/${programIdNumber}/assignments/${assignmentIdNumber}/questions/${questionNumberNumber + 1}`);
  };
  const handleBackButton = () => {
    if (questionNumberNumber <= 0) {
      return;
    }
    router.push(`/programs/${programIdNumber}/assignments/${assignmentIdNumber}/questions/${questionNumberNumber - 1}`);
  };

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const data = await getAssignmentById(assignmentIdNumber);
        setProgramAssignment(data as Assignment);
        const questions = await getAssignmentByIdQuestionsAndSubmissions(assignmentIdNumber);
        setAssignmentQuestions(questions as AssignmentQuestion[]);
        setAssignmentQuestionsLength(questions.length);
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
        <ProgressBar questionCount={assignmentQuestionsLength} currentQuestion={questionNumberNumber + 1} />
      </HStack>
      <VStack w="100%" alignItems="left" padding="32px">
        <Text fontFamily="Poppins" fontSize="15px" fontWeight={500} color="Slate">
          {`Question: ${questionNumberNumber + 1} out of ${assignmentQuestionsLength}`}
        </Text>
        <Text fontFamily="Poppins" fontSize="22px" fontWeight={700} color="Slate">
          {programAssignment?.title}
        </Text>
        <Text fontFamily="Poppins" fontSize="16px" fontWeight={500} color="Slate">
          {assignmentQuestions && assignmentQuestions[questionNumberNumber]?.questionText}
        </Text>
        <CodeEditor />
        <HStack w="100%" justifyContent="right" mt="23px">
          <Button
            type="secondary"
            pageColor="aqua"
            text="Back"
            height="60px"
            width="130px"
            onClick={handleBackButton}
          />
          <Button type="primary" pageColor="aqua" text="Next" height="60px" width="130px" onClick={handleNextButton} />
        </HStack>
      </VStack>
    </VStack>
  );
}
