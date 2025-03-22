'use client';

import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface ResourceProps {
  title: string;
  dueDate: string;
  icon: React.ReactNode;
  resourceType: string;
}

export default function Resource({ title, dueDate, icon, resourceType }: ResourceProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const isAssignment = resourceType === 'assignment';
  const buttonText = isCompleted ? (isAssignment ? 'Completed' : 'Viewed') : isAssignment ? 'Incomplete' : 'Not Viewed';

  const buttonBg = isCompleted ? 'Sky' : 'Aqua';
  const buttonColor = isCompleted ? 'black' : 'white';

  const Icon = isCompleted ? (
    isAssignment ? (
      <Check size={16} />
    ) : (
      <Eye size={16} />
    )
  ) : isAssignment ? (
    <X size={16} />
  ) : (
    <EyeOff size={16} />
  );

  return (
    <Flex align="center" justify="space-between" bg="white" p={4} borderRadius="md" width="100%" marginTop={3}>
      <Box marginRight={4}>{icon}</Box>

      <Box flex="1">
        <Text fontWeight="semibold" fontSize="md">
          {title}
        </Text>
        <Text fontSize="sm">Due Date: {dueDate}</Text>
      </Box>

      <Button
        onClick={() => setIsCompleted(!isCompleted)}
        bg={buttonBg}
        color={buttonColor}
        borderRadius="md"
        px={4}
        py={2}
        fontSize="sm"
        fontWeight="bold"
      >
        <Flex align="center" gap={2}>
          {Icon}
          <Text>{buttonText}</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
