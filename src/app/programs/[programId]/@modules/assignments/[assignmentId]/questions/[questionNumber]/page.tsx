'use client';

import { Box, HStack, VStack, Text, IconButton, Skeleton, SkeletonText } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { X } from 'lucide-react';
import DreamBuddy from '@/src/components/dreambuddy/DreamBuddy';
import { useState, useEffect } from 'react';
import {
  getAssignmentByIdQuestionsAndSubmissions,
  getAssignmentById,
  getAssignmentByIdQuestions,
} from '@/src/lib/query/assignments';
import { Assignment, AssignmentQuestion } from '@prisma/client';
import { useParams } from 'next/navigation';
import ProgressBar from '@/src/components/ProgressBar';
import { useRouter } from 'next/navigation';
import { submitQuestionAnswer } from '@/src/lib/query/assignments';

import CodeEditor from '@/src/components/CodeEditor';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function QuestionPage() {
  const { programId, assignmentId, questionNumber } = useParams<{
    programId: string;
    assignmentId: string;
    questionNumber: string;
  }>();
  const programIdNumber = Number(programId);
  const assignmentIdNumber = Number(assignmentId);
  const questionIdx = Number(questionNumber);
  const router = useRouter();
  const { user } = useUser();

  const [programAssignment, setProgramAssignment] = useState<Assignment | null>(null);
  const [assignmentQuestions, setAssignmentQuestions] = useState<AssignmentQuestion[] | null>(null);
  const [assignmentQuestionsLength, setAssignmentQuestionsLength] = useState(0);
  const [answerText, setAnswerText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignment() {
      const data = await getAssignmentById(assignmentIdNumber);
      setProgramAssignment(data as Assignment);
      const questions = await getAssignmentByIdQuestionsAndSubmissions(assignmentIdNumber);
      setAssignmentQuestions(questions as AssignmentQuestion[]);
      setAssignmentQuestionsLength(questions.length);
    }
    fetchAssignment();
  }, [assignmentIdNumber]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    (async () => {
      // 1) fetch the assignment meta
      const assignment = await getAssignmentById(assignmentIdNumber);
      setProgramAssignment(assignment as Assignment);

      // 2) fetch questions + any existing submission answers
      const qs = await getAssignmentByIdQuestions(assignmentIdNumber, user?.id as number);
      setAssignmentQuestions(qs as AssignmentQuestion[]);
      setAssignmentQuestionsLength(qs.length);

      // 3) prefill answerText (or clear it if none)
      const existing = qs[questionIdx]?.existingAnswer;
      console.log({ existing });
      setAnswerText(existing?.answerText ?? '');

      setIsLoading(false);
    })();
  }, [assignmentIdNumber, questionIdx, user]);

  const handleExitClick = () => {
    router.push(`/programs/${programIdNumber}`);
  };
  const handleNext = async () => {
    const q = assignmentQuestions![questionIdx];
    console.log({ questionId: q.id });
    await submitQuestionAnswer({
      assignmentId: assignmentIdNumber,
      questionId: q.id,
      answerText,
      fileUrl: undefined,
    });

    if (questionIdx < assignmentQuestions!.length - 1) {
      router.push(`/programs/${programIdNumber}/assignments/${assignmentIdNumber}/questions/${questionIdx + 1}`);
    } else if (questionIdx === assignmentQuestions!.length - 1) {
      router.push(`/feedback/${programIdNumber}`);
    }
  };

  const handleBackButton = () => {
    if (questionIdx <= 0) return;
    router.push(`/programs/${programIdNumber}/assignments/${assignmentIdNumber}/questions/${questionIdx - 1}`);
  };

  return (
    <VStack w="100%" minH="200px" alignItems="left">
      {isLoading ? (
        <Skeleton w="100%" h="40px" mt="26px" />
      ) : (
        <HStack w="100%" h="20px" mt="26px">
          <IconButton as={X} variant="ghost" size="sm" onClick={handleExitClick} />
          <ProgressBar questionCount={assignmentQuestionsLength} currentQuestion={questionIdx + 1} />
        </HStack>
      )}

      <VStack w="100%" alignItems="left" p="32px" padding={'32px'}>
        {isLoading ? (
          <SkeletonText noOfLines={1} height="15px" w="250px" />
        ) : (
          <Text fontFamily="Poppins" fontSize="15px" fontWeight={500} color="Slate">
            {`Question: ${questionIdx + 1} out of ${assignmentQuestionsLength}`}
          </Text>
        )}
        {isLoading ? (
          <SkeletonText noOfLines={1} height="22px" w="300px" />
        ) : (
          <Text fontFamily="Poppins" fontSize="22px" fontWeight={700} color="Slate">
            {programAssignment?.title}
          </Text>
        )}
        {isLoading ? (
          <SkeletonText noOfLines={3} height="16px" w="100%" />
        ) : (
          <Text fontFamily="Poppins" fontSize="16px" fontWeight={500} color="Slate">
            {assignmentQuestions?.[questionIdx]?.questionText}
          </Text>
        )}
        <CodeEditor value={answerText} onChange={(val: string) => setAnswerText(val)} />{' '}
        <HStack w="100%" justifyContent="right" pr="87px" mt="23px" padding={'32px'}>
          <>
            <Button
              type="secondary"
              pageColor="aqua"
              text="Back"
              textSize="16px"
              height="60px"
              width="130px"
              onClick={handleBackButton}
            />
            <Button
              type="primary"
              pageColor="aqua"
              text={questionIdx < assignmentQuestionsLength - 1 ? 'Next' : 'Submit'}
              textSize="16px"
              height="60px"
              width="130px"
              onClick={handleNext}
            />
          </>
        </HStack>
      </VStack>
      {<DreamBuddy isVisible={true} />}
    </VStack>
  );
}
