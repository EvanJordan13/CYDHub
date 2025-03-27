'use client';

import React, { useState } from 'react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger, Box, Text, Flex } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';

interface DropDownInputProps {
  labelText?: string;
  helperText: string;
  options: string[];
  showIcon?: boolean;
  isRequired?: boolean;
}

const DropDownInput: React.FC<DropDownInputProps> = ({
  helperText,
  labelText,
  showIcon = true,
  options,
  isRequired = false,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Box width="100%" {...rest}>
      {labelText && (
        <Text mb={2} fontSize="sm" fontWeight={'medium'}>
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
            borderColor={isFocused ? 'Aqua' : '#AAAAAA'}
            _hover={{ background: '#E0EEFF' }}
            _focus={{ outline: 'none' }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            transition="none"
            height={12}
            aria-label={selectedOption ? `Selected option is ${selectedOption}` : 'Select an option'}
          >
            <Flex justify="space-between" align="center" width="100%">
              <Text truncate color={selectedOption ? 'black' : '#AAAAAA'} fontWeight={'normal'} fontSize={'sm'}>
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
  );
};

export default DropDownInput;
