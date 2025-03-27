'use client';

import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import TextInput from './TextInput';
import { Calendar } from 'lucide-react';

interface DatePickerInputProps {
  labelText?: string;
  helperText: string;
  isRequired?: boolean;
  showIcon?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  labelText = '',
  helperText,
  isRequired = false,
  showIcon = true,
  ...rest
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, '');

    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    if (inputValue.length >= 2 && inputValue.length < 4) {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
    } else if (inputValue.length >= 4) {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2, 4) + '/' + inputValue.slice(4);
    }

    setValue(inputValue);
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

      <TextInput
        label={helperText}
        width={20}
        icon={showIcon ? <Calendar /> : undefined}
        onChange={handleChange}
        value={value}
      />
    </Box>
  );
};

export default DatePickerInput;
