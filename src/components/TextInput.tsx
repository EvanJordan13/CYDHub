'use client';

import { useState } from 'react';
import { Input, Flex, Box } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface TextInputProps {
  label: string;
  width: number; // please provide width in rem for accessibility
  icon: React.ReactNode; // Change type to accept JSX instead of function component
}

export default function TextInput({ label, width = 18.75, icon }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Flex
      align="center"
      border="0.125rem solid"
      borderColor={isFocused ? '#8D608C' : '#AAAAAA'}
      borderRadius="md"
      px={3}
      py={1}
      width={`${width}rem`}
    >
      <Box color={isFocused ? '#8D608C' : '#AAAAAA'} boxSize={6}>
        {icon}
      </Box>
      <Input
        variant="flushed"
        ml={2}
        placeholder={label}
        aria-label={label} // important: allows input to be read by screen readers
        color={isFocused ? 'black' : 'black'}
        borderColor="transparent"
        _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Flex>
  );
}
