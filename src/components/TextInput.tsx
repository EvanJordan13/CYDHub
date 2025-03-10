'use client';

import { useState } from 'react';
import { Input, Flex, Box } from '@chakra-ui/react';
import defaultTheme from '../lib/themes/default';

interface TextInputProps {
  label: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ label, icon, value = '', onChange = () => {} }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Flex
      align="center"
      borderWidth={'0.125rem'}
      borderColor={isFocused ? 'Aqua' : '#AAAAAA'}
      borderRadius="sm"
      px={3}
      width={'100%'}
      _hover={{ background: '#E0EEFF' }}
    >
      <Box color={'#AAAAAA'} boxSize={6}>
        {icon}
      </Box>
      <Input
        variant="flushed"
        ml={2}
        py={3}
        placeholder={label}
        aria-label={label} // important: allows input to be read by screen readers
        color={isFocused ? 'black' : 'black'}
        value={value}
        borderColor="transparent"
        _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
    </Flex>
  );
}
