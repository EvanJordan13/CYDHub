import Link from 'next/link';
import { Box, Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

interface AnimatedLinkProps extends ChakraLinkProps {
  link: string;
  linkName: string;
  underlineColor?: string;
}

export default function AnimatedLink({ link, linkName, underlineColor = 'Flamingo', ...rest }: AnimatedLinkProps) {
  return (
    <Box position="relative" display="inline-block">
      <Box as="span" position="absolute" opacity="0" pointerEvents="none" whiteSpace="nowrap">
        {linkName}
      </Box>

      <ChakraLink
        as={Link}
        href={link}
        textDecoration="none"
        display="inline-block"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: '0',
          width: '0px',
          height: '2px',
          backgroundColor: underlineColor,
          transition: 'width 0.3s ease-in-out',
        }}
        _hover={{
          _after: {
            width: '100%',
          },
        }}
        _focus={{
          outline: 'none',
        }}
        {...rest}
      >
        {linkName}
      </ChakraLink>
    </Box>
  );
}
