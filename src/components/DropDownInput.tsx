'use client';

import React, { useState } from 'react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger, Menu, Box, Text, Flex } from '@chakra-ui/react';
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

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Box width="100%" {...rest}>
      {labelText && (
        <Text mb={2} fontSize="sm">
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
            rounded={'sm'}
            width="100%"
            py={5}
            px={3}
            borderWidth={'2px'}
            _focus={{ outline: 'none' }}
          >
            <Flex justify="space-between" align="center" width="100%">
              <Text truncate color={'#AAAAAA'} fontSize={'sm'}>
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
