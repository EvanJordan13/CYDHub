import { Text, Heading, Box, Flex, RatingGroup, UseRatingGroupReturn } from '@chakra-ui/react';
import FeedbackCard from '@/src/components/FeedbackCard';
import Button from '@/src/components/Button';

interface FeedbackFormProps {
  RatingsValue: UseRatingGroupReturn;
  FeedbackQuestions: [string, string, string[]][];
  handleFeedbackChange: (index: number, value: string) => void;
  onSubmitFeedback?: () => void;
}

export default function FeedbackForm({
  RatingsValue,
  FeedbackQuestions,
  handleFeedbackChange,
  onSubmitFeedback,
}: FeedbackFormProps) {
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

      <RatingGroup.RootProvider value={RatingsValue} size="lg" colorPalette={'yellow'} mb={10}>
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.RootProvider>

      <Flex direction="column" gap={6}>
        {FeedbackQuestions.map(([question, placeholder, words], index) => (
          <FeedbackCard
            key={index}
            question={question}
            words={words}
            placeholder={placeholder}
            onFeedbackChange={value => handleFeedbackChange(index, value)}
          />
        ))}
      </Flex>
      <Box mt={20} display={'flex'} justifyContent={'flex-end'}>
        <Button type="primary" pageColor="aqua" text="Submit" height={14} width={40} onClick={onSubmitFeedback} />
      </Box>
    </Flex>
  );
}
