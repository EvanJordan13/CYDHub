'use client';

import { useState } from 'react';
import { Input, Flex, Box, Field } from '@chakra-ui/react';

interface TextInputProps {
  label: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  height?: number;
  invalidFunction?: () => boolean;
}

export default function TextInput({
  label,
  icon,
  value,
  onChange,
  disabled = false,
  height = 12,
  invalidFunction = () => !value || value.trim() === '',
}: TextInputProps) {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const isInvalid = hasBeenTouched && invalidFunction();

  return (
    <Field.Root required>
      <Flex
        align="center"
        border="0.125rem solid"
        borderColor={isInvalid ? 'red' : disabled || !hasBeenTouched ? '#AAAAAA' : 'Aqua'}
        borderRadius="md"
        width="100%"
        height={height}
        _hover={{ background: disabled ? '' : '#E0EEFF' }}
        bgColor={disabled ? '#F0EFEF' : ''}
      >
        <Box color="#AAAAAA" ml="4%" transform="scale(1.2)" bgColor={disabled ? '#F0EFEF' : ''}>
          {icon}
        </Box>

        <Input
          variant="flushed"
          ml={3}
          placeholder={label}
          _placeholder={{ color: '#AAAAAA' }}
          aria-label={label}
          color="black"
          borderColor="transparent"
          _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
          onChange={onChange}
          value={value}
          onBlur={() => setHasBeenTouched(true)}
          fontSize="120%"
          fontWeight={500}
          disabled={disabled}
        />
      </Flex>
    </Field.Root>
  );
}
