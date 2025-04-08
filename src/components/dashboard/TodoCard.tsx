import Image from 'next/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Assignment } from '@prisma/client';
import { SquareArrowOutUpRight } from 'lucide-react';

interface TodoCardProps {
  assignments: Assignment[];
}

export default function TodoCard({ assignments }: TodoCardProps) {
  return (
    <Flex
      width={'100%'}
      fontWeight={600}
      gap={'24px'}
      flexDirection={'column'}
      p={'24px 32px'}
      boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      borderRadius={'12px'}
    >
      <Flex gap={4} flexDirection={'column'}>
        <Image src="/assignment.png" alt="Todo Card" width={64} height={64} draggable="false" />
        <Flex flexDirection={'row'} justify="space-between" align="center" fontSize={'16px'}>
          <Heading>Upcoming Assignment(s)</Heading>
          <Text textDecoration={'underline'} cursor={'pointer'}>
            View More
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} gap={4} fontSize={'14px'}>
        {assignments.slice(0, 3).map(assignment => (
          <Flex
            key={assignment.id}
            rounded={'6px'}
            p={'12px 24px'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={'10px'}
            boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
            _hover={{
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease-in-out"
            cursor={'pointer'}
          >
            <SquareArrowOutUpRight width={20} height={20} />
            <Text>{assignment.title}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
