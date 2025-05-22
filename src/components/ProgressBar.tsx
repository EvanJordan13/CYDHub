import { Box } from '@chakra-ui/react';

interface ProgressBarProps {
  questionCount: number;
  currentQuestion: number;
}

export default function ProgressBar({ questionCount, currentQuestion }: ProgressBarProps) {
  const percent = questionCount > 0 ? (currentQuestion / questionCount) * 100 : 0;

  return (
    <Box h={6} w="100%" bg="#E4E4E4" borderRadius="md" overflow="hidden">
      <Box h="100%" w={`${percent}%`} bg="Aqua" />
    </Box>
  );
}
