'use client';

import React, { useState } from 'react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger, Box, Text, Flex, Field } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';

interface DropDownInputProps {
  labelText?: string;
  helperText: string;
  options: string[];
  showIcon?: boolean;
  isRequired?: boolean;
  height?: string;
  value?: string | null;
  onChange?: (value: string) => void;
}

const DropDownInput: React.FC<DropDownInputProps> = ({
  helperText,
  labelText,
  showIcon = true,
  options,
  isRequired = false,
  height = 12,
  value,
  onChange,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const selectedOption = value !== undefined ? value : internalValue;
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && (!selectedOption || !options.includes(selectedOption));

  const handleSelect = (option: string) => {
    if (onChange) {
      onChange(option);
    } else {
      setInternalValue(option);
    }
  };

  return (
    <Field.Root required>
      <Box width="100%" height={height} {...rest}>
        {labelText && (
          <Text mb={2} fontSize=".97vw" fontWeight={'medium'} color={'black'}>
            {labelText}
            {isRequired && (
              <Text as="span" color="red.500">
                {' '}
                *
              </Text>
            )}
          </Text>
        )}

        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              rounded={'md'}
              width="100%"
              borderWidth={'0.125rem'}
              borderColor={isFocused ? 'Aqua' : isInvalid ? 'red' : '#AAAAAA'}
              _hover={{ background: '#E0EEFF' }}
              _focus={{ outline: 'none' }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setTouched(true);
              }}
              transition="none"
              height={height}
              aria-label={selectedOption ? `Selected option is ${selectedOption}` : 'Select an option'}
            >
              <Flex justify="space-between" align="center" width="100%">
                <Text color={selectedOption ? 'black' : '#AAAAAA'} fontWeight={500} fontSize={'clamp(16px,.97vw,40px)'}>
                  {selectedOption || helperText}
                </Text>
                {showIcon && <ChevronDown color="#AAAAAA" />}
              </Flex>
            </Button>
          </MenuTrigger>
          <MenuContent position="absolute" zIndex={10} mt={1}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option} onClick={() => handleSelect(option)}>
                {option}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      </Box>
    </Field.Root>
  );
};

export default DropDownInput;
