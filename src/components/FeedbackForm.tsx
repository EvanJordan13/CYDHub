'use client';

import { Text, Heading, Box, Flex, RatingGroup, UseRatingGroupReturn, useRatingGroup } from '@chakra-ui/react';
import FeedbackCard from '@/src/components/FeedbackCard';
import Button from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import { storeSurveyResponse } from '../lib/query/survey';
import { updateUserPoints } from '../lib/query/users';
import { useState } from 'react';

const defaultQuestions = [
  ['What did you like about this assignment?', 'I liked...', ['like']],
  ['What would you do to improve this assignment?', 'I would improve...', ['improve']],
] as [string, string, string[]][];

interface FeedbackFormProps {
  RatingsValue?: UseRatingGroupReturn;
  FeedbackQuestions?: [string, string, string[]][];
  handleFeedbackChange?: (index: number, value: string) => void;
  onSubmitFeedback?: () => void;
  programId: number;
  userId: number;
  points: number;
}

export default function FeedbackForm({
  RatingsValue,
  FeedbackQuestions,
  handleFeedbackChange,
  onSubmitFeedback,
  userId,
  programId,
  points,
}: FeedbackFormProps) {
  const router = useRouter();
  const [feedbackValues, setFeedbackValues] = useState<{ [key: number]: string }>({});
  const ratings = RatingsValue ? RatingsValue : useRatingGroup({ count: 5, defaultValue: 0 });
  const questions = FeedbackQuestions ? FeedbackQuestions : defaultQuestions;

  const changeHandler = handleFeedbackChange
    ? handleFeedbackChange
    : (index: number, value: string) => {
        setFeedbackValues(prev => ({ ...prev, [index]: value }));
      };

  const onSubmit = onSubmitFeedback
    ? onSubmitFeedback
    : async () => {
        await Promise.all(
          questions.map(async ([questionText], index) => {
            const response = feedbackValues[index];
            if (questionText === 'Rating?' || !response || response.trim() === '') {
              return null;
            }
            await storeSurveyResponse(questionText, userId, response);
          }),
        );
        if (ratings.value > 0) {
          await storeSurveyResponse('Rating?', userId, String(ratings.value));
        }
        await updateUserPoints(userId, points);
        router.push('/feedback/' + String(programId));
      };

  return (
    <Flex direction={'column'} ml={2} marginTop={7}>
      <Heading fontSize={'3xl'} fontWeight={'bold'} marginBottom={3}>
        Feedback Survey
      </Heading>

      <Text fontWeight={'medium'} mb={7}>
        Complete this optional survey to earn points!
      </Text>

      <Text fontSize={'lg'} fontWeight={'semibold'} mb={2}>
        Please provide this assignment a star rating.
      </Text>

      <RatingGroup.RootProvider value={ratings} size="lg" colorPalette={'yellow'} mb={10}>
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.RootProvider>

      <Flex direction="column" gap={6}>
        {questions.map(([question, placeholder, words], index) => (
          <FeedbackCard
            key={index}
            question={question}
            words={words}
            placeholder={placeholder}
            onFeedbackChange={value => changeHandler(index, value)}
          />
        ))}
      </Flex>
      <Box mt={20} display={'flex'} justifyContent={'flex-end'}>
        <Button type="primary" pageColor="aqua" text="Submit" height={14} width={40} onClick={onSubmit} />
      </Box>
    </Flex>
  );
}
