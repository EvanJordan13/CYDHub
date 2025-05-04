import { Box, Text, Stack, IconButton } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface AssignmentDetailProps {
  programId: number;
  assignmentId: number;
  assignmentNumber: number | null;
  assignmentTitle: string;
  dueDate: Date | null;
  questionCount: number | null;
  description: string | null;
  onBackClick?: () => void;
}

const formatDate = (date: Date) => {
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const time = date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
    .replace(' ', '');

  return `${month} ${day}${suffix}, ${time}`;
};

export default function AssignmentDetail({
  programId,
  assignmentId,
  assignmentNumber,
  assignmentTitle,
  dueDate,
  questionCount,
  description,
}: AssignmentDetailProps) {
  const router = useRouter();
  const handleAssignmentClick = () => {
    router.push(`/programs/${programId}/assignments/${assignmentId}/questions/0`);
  };
  const onBackClick = () => {
    router.push(`/programs/${programId}`);
  };
  return (
    <Box position={'relative'} mt={6}>
      <Box position={'absolute'} top={0} right={0}>
        <Button
          type={'secondary'}
          pageColor={'aqua'}
          text={'Start Assignment'}
          textSize="16px"
          height={'12'}
          width={'44'}
          onClick={handleAssignmentClick}
        />
      </Box>

      <Stack direction={'row'}>
        <IconButton variant={'ghost'} mt={-1} size={'md'} onClick={onBackClick}>
          <ArrowLeft strokeWidth={'3px'}></ArrowLeft>
        </IconButton>

        <Text fontWeight={'bold'} fontSize={'24px'}>
          {assignmentNumber && <Box as="span">Assignment {assignmentNumber}:</Box>} {assignmentTitle}
        </Text>
      </Stack>

      {(dueDate || questionCount) && (
        <Stack direction={'row'} spaceX={2} mt={6}>
          {dueDate && (
            <Box
              bg={'white'}
              borderWidth={'1px'}
              borderColor={'Aqua'}
              borderRadius={'lg'}
              shadow={'sm'}
              width={'fit-content'}
              px={3}
              py={2}
            >
              <Text>
                <Box as="span" fontWeight="bold">
                  Due Date:
                </Box>{' '}
                {formatDate(dueDate)}
              </Text>
            </Box>
          )}

          {questionCount && (
            <Box
              bg={'white'}
              borderWidth={'1px'}
              borderColor={'Aqua'}
              borderRadius={'lg'}
              shadow={'sm'}
              width={'fit-content'}
              px={3}
              py={2}
            >
              <Text>
                <Box as="span" fontWeight="bold">
                  # of Questions:
                </Box>{' '}
                {questionCount}
              </Text>
            </Box>
          )}
        </Stack>
      )}

      {description && (
        <Box>
          <Text fontWeight={'bold'} fontSize={'18px'} mt={6}>
            Instructions:
          </Text>

          <Text mt={2}>{description}</Text>
        </Box>
      )}
    </Box>
  );
}
