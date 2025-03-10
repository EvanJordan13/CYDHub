import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';

interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  height: string;
  width: string;
  onClick?: () => void;
}

export default function Button({ type, text, height, width, onClick }: ButtonProps) {
  return (
    <Box
      height={height}
      width={width}
      bg={type === 'primary' ? '#BC3860' : 'white'}
      borderWidth={'1px'}
      borderColor={type === 'primary' ? '#A01B43' : '#E5E5E5'}
      borderRadius={'12px'}
      borderBottomWidth={'4px'}
      display="flex"
      alignItems={'center'}
      justifyContent={'center'}
      onClick={onClick}
    >
      <Text fontSize={'16px'} fontWeight={'semibold'} color={type === 'primary' ? 'white' : 'black'}>
        {text}
      </Text>
    </Box>
  );
}
