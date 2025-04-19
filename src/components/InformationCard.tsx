import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex, Image, VStack } from '@chakra-ui/react';

interface InformationCardProps {
  title: string;
  description: string;
}

export default function InformationCard({ title, description }: InformationCardProps) {
  return (
    <Box
      height="25.97vh"
      width="28vw"
      minH="266px"
      bg={'white'}
      borderWidth={'2px'}
      borderColor={'lightgray'}
      borderRadius={'2xl'}
      padding="28px"
    >
      <VStack alignItems="left">
        <Image src="/information-card-icon.png" width="clamp(32px, 2.2vw, 100px)" height="clamp(32px, 2.2vw, 100px)" />
        <Text fontWeight={700} fontSize="clamp(32px, 2.2vw, 100px)" fontFamily={'Poppins'} color="Slate">
          {title}
        </Text>
        <Text fontWeight={500} fontSize="clamp(16px, 1.1vw, 50px)" fontFamily={'Poppins'} color="Slate">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
