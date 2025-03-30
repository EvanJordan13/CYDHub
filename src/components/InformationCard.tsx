import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex, Image, VStack } from '@chakra-ui/react';

interface InformationCardProps {
  title: string;
  description: string;
}

export default function InformationCard({ title, description }: InformationCardProps) {
  return (
    <Box
      height={266}
      width={408}
      bg={'white'}
      borderWidth={'2px'}
      borderColor={'lightgray'}
      borderRadius={'2xl'}
      padding="28px"
    >
      <VStack alignItems="left">
        <Image src="/information-card-icon.png" width="32px" height="32px" />
        <Text fontWeight={700} fontSize="32px" fontFamily={'Poppins'} color="Slate">
          {title}
        </Text>
        <Text fontWeight={500} fontSize="16px" fontFamily={'Poppins'} color="Slate">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
