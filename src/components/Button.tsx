import { Box, Text } from '@chakra-ui/react';

interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  height: string;
  width: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ type, text, height, width, disabled, onClick }: ButtonProps) {
  return (
    <Box
      height={height}
      width={width}
      bg={disabled ? '#959494' : type === 'primary' ? '#BC3860' : 'white'}
      _hover={
        disabled
          ? { bg: '#959494' }
          : type === 'primary'
            ? { bg: '#E44777', textDecoration: 'underline', textDecorationColor: 'white' }
            : { bg: '#E7EDFF', textDecoration: 'underline', textDecorationColor: '#4D80BB' }
      }
      borderWidth={'1px'}
      borderColor={disabled ? '#959494' : type === 'primary' ? '#992B4D' : '#4D80BB'}
      borderRadius={'12px'}
      borderBottomWidth={'4px'}
      display="flex"
      alignItems={'center'}
      justifyContent={'center'}
      onClick={disabled ? undefined : onClick}
    >
      <Text
        fontSize={'16px'}
        fontWeight={'700'}
        color={type === 'primary' ? 'white' : type === 'secondary' ? '#4D80BB' : '#DEDEDE'}
      >
        {text}
      </Text>
    </Box>
  );
}
