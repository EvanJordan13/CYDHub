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
    const inputEvent = e.nativeEvent as InputEvent;
    const isBackspace = inputEvent.inputType === 'deleteContentBackward';

    let formattedValue = e.target.value.replace(/\D/g, '');

    if (formattedValue.length > 8) {
      formattedValue = formattedValue.slice(0, 8);
    }

    if (formattedValue.length >= 2 && formattedValue.length < 4) {
      formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
    } else if (formattedValue.length >= 4) {
      formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4) + '/' + formattedValue.slice(4);
    }

    const lastIsSlash = formattedValue.charAt(formattedValue.length - 1) === '/';

    if (isBackspace && lastIsSlash) {
      formattedValue = formattedValue.slice(0, formattedValue.length - 1);

      console.log(formattedValue);
      setValue(formattedValue.slice(0, formattedValue.length));
      return;
    }

    setValue(formattedValue);
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

      <TextInput label={helperText} icon={showIcon ? <Calendar /> : undefined} onChange={handleChange} value={value} />
    </Box>
  );
};

export default DatePickerInput;
