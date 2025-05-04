import { useState } from 'react';

import { Flex, Box } from '@chakra-ui/react';
import TextInput from '@/src/components/TextInput';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  handleWarning?: (warning: string) => void;
}

export default function PasswordInput({ disabled, value, onChange }: PasswordInputProps) {
  return (
    <Flex>
      <TextInput label="Password" icon={<></>} disabled={disabled} value={value} height={20} isSecret={true} />
    </Flex>
  );
}
