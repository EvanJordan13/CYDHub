import { Box, Text, Stack } from '@chakra-ui/react';
import Button from './Button';

interface AssignmentDescriptionProps {
  assignmentNumber: number | null;
  assignmentTitle: string;
  dueDate: Date | null;
  questionCount: number | null;
  description: string | null;
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

export default function AssignmentDescription({
  assignmentNumber,
  assignmentTitle,
  dueDate,
  questionCount,
  description,
}: AssignmentDescriptionProps) {
  return (
    <Box position={'relative'} mt={6}>
      <Box position={'absolute'} top={0} right={0}>
        <Button type={'secondary'} pageColor={'aqua'} text={'Start Assignment'} height={'12'} width={'44'} />
      </Box>

      <Text fontWeight={'bold'} fontSize={'24px'}>
        {assignmentNumber && <Box as="span">Assignment {assignmentNumber}:</Box>} {assignmentTitle}
      </Text>

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
