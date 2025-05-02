'use client';

import { useState } from 'react';
import { Input, Flex, Box, Field, Button } from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
  label: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isSecret?: boolean;
  height?: number;
  invalidFunction?: () => boolean;
}

export default function TextInput({
  label,
  icon,
  value,
  onChange,
  disabled = false,
  isSecret = false,
  height = 12,
  invalidFunction = () => !value || value.trim() === '',
}: TextInputProps) {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showSecretValue, setShowSecretValue] = useState(false);
  const isInvalid = hasBeenTouched && invalidFunction();

  return (
    <Field.Root required>
      <Flex
        align="center"
        border="0.125rem solid"
        borderColor={isInvalid ? 'red' : disabled || (!hasBeenTouched && !isFocused) ? '#AAAAAA' : 'Aqua'}
        borderRadius="md"
        width="100%"
        height={height}
        _hover={{ background: disabled ? '' : '#E0EEFF' }}
        bgColor={disabled ? '#F0EFEF' : ''}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
          fontSize="120%"
          fontWeight={500}
          disabled={disabled}
        />
        {isSecret && (
          <Box onClick={() => setShowSecretValue(!showSecretValue)} mr="4%">
            {showSecretValue ? <Eye /> : <EyeOff />}
          </Box>
        )}
      </Flex>
    </Field.Root>
  );
}
