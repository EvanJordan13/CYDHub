import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex, Image, VStack, Icon, IconProps } from '@chakra-ui/react';
import { LayoutDashboardIcon } from 'lucide-react';

interface InformationCardProps {
  title: string;
  description: string;
  icon?: IconProps['as'];
}

export default function InformationCard({ title, description, icon = LayoutDashboardIcon }: InformationCardProps) {
  return (
    <Box
      height="25.97vh"
      minH="266px"
      width={'28%'}
      bg={'white'}
      borderWidth={'2px'}
      borderColor={'lightgray'}
      borderRadius={'2xl'}
      padding="28px"
      _hover={{ transform: 'translateY(-2px)' }}
      transition={'transform 0.3s ease-in-out'}
    >
      <VStack alignItems="left">
        <Icon as={icon} boxSize="32px" color="Slate" strokeWidth={1.5} />
        <Text fontWeight={700} fontSize="32px" fontFamily={'Poppins'} color="Slate">
          {title}
        </Text>
        <Text fontWeight={500} fontSize="clamp(16px, 1.1vw, 50px)" fontFamily={'Poppins'} color="Slate">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
