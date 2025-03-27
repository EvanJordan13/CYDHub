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

export default function TextInput({ label, icon, value, onChange }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Flex
      align="center"
      border="0.125rem solid"
      borderColor={isFocused ? 'Aqua' : '#AAAAAA'}
      borderRadius="md"
      width={`100%`}
      height={12}
      _hover={{ background: '#E0EEFF' }}
    >
      <Box color={'#AAAAAA'} ml={2.5} transform={'scale(0.9)'}>
        {icon}
      </Box>
      <Input
        variant="flushed"
        ml={2}
        placeholder={label}
        _placeholder={{ color: '#AAAAAA' }}
        aria-label={label} // important: allows input to be read by screen readers
        color={'black'}
        borderColor="transparent"
        _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
        onChange={onChange}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        fontSize="sm"
      />
    </Flex>
  );
}
