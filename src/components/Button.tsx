import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';

interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  link: string;
  height: string;
  width: string;
}

export default function Button({ type, text, link, height, width }: ButtonProps) {
  return (
    <Link href={link} passHref>
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
      >
        <Text fontSize={'16px'} fontWeight={'semibold'} color={type === 'primary' ? 'white' : 'black'}>
          {text}
        </Text>
      </Box>
    </Link>
  );
}
