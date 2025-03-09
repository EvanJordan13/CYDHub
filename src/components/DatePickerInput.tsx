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
    labelText = "",
    helperText,
    isRequired = false,
    showIcon = true,
    ...rest
}) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        inputValue = inputValue.replace(/[^0-9/]/g, "");

        inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");

        if (inputValue.length > 10) {
            inputValue = inputValue.slice(0, 10);
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
                value={value}
                onChange={handleChange}
                icon={showIcon ? <Calendar /> : undefined}
                width={10}
            />
        </Box>
    );
};

export default DatePickerInput;
