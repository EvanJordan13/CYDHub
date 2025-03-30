import { Box, Text, Stack } from '@chakra-ui/react';
import Button from './Button';

interface AssignmentDescriptionProps {
  assignmentNumber: number;
  assignmentTitle: string;
  dueDate: string;
  numQuestions: number;
  description: string;
}

export default function AssignmentDescription({
  assignmentNumber,
  assignmentTitle,
  dueDate,
  numQuestions,
  description,
}: AssignmentDescriptionProps) {
  return (
    <Box position={'relative'}>
      <Box position={'absolute'} top={0} right={0}>
        <Button type={'secondary'} pageColor={'aqua'} text={'Start Assignment'} height={'12'} width={'44'} />
      </Box>
      <Text fontWeight={'bold'} fontSize={'24px'}>
        Assignment #{assignmentNumber}: {assignmentTitle}
      </Text>

      <Stack direction={'row'} spaceX={2} mt={6}>
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
            {dueDate}
          </Text>
        </Box>

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
            {numQuestions}
          </Text>
        </Box>
      </Stack>

      <Text fontWeight={'bold'} fontSize={'18px'} mt={6}>
        Instructions:
      </Text>

      <Text mt={2}>{description}</Text>
    </Box>
  );
}
