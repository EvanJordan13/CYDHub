'use client';

import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import TextInput from './TextInput';
import { Calendar } from 'lucide-react';
import { parse, isValid } from 'date-fns';

interface DatePickerInputProps {
  labelText?: string;
  helperText: string;
  isRequired?: boolean;
  showIcon?: boolean;
  height?: number;
  val?: string | null;
  onChange?: (value: string) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  labelText = '',
  helperText,
  isRequired = false,
  showIcon = true,
  height = 12,
  val,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(val ? val : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      setValue(formattedValue);
      if (onChange) onChange(formattedValue);
      return;
    }

    setValue(formattedValue);
    if (onChange) onChange(formattedValue);
  };

  const isValidDate = (dateStr: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!regex.test(dateStr)) {
      return false;
    }

    const parsedDate = parse(dateStr, 'MM/dd/yyyy', new Date());
    return isValid(parsedDate);
  };

  return (
    <Box width="100%" {...rest}>
      {labelText && (
        <Text mb={2} fontSize="14px" fontWeight={'medium'}>
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
        icon={showIcon ? <Calendar /> : undefined}
        onChange={handleChange}
        value={value}
        height={Number(height)}
        invalidFunction={() => !isValidDate(value)}
      />
    </Box>
  );
};

export default DatePickerInput;
