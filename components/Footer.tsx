'use client';

import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box py={4}>
      <Flex justifyContent="center" alignItems="center" gap={6}>
        <Text color="gray.600">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </Text>
        <ChakraLink as={Link} href="/terms" color="gray.600">
          Terms & Privacy
        </ChakraLink>
      </Flex>
    </Box>
  );
}
