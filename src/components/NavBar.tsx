'use client';

import React from 'react';
import { Box, Text, Link, Stack, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const handleNextClick = () => {
    router.push('/onboarding');
  };

  return (
    <Box py="5" px="12">
      <Flex direction={'row'} align="center" justify={'space-between'}>
        <Text
          fontFamily="logo"
          fontSize="3xl"
          fontWeight="normal"
          color="#BC3860"
          whiteSpace="nowrap"
          mr="4"
          _hover={{ cursor: 'default' }}
        >
          Code Your Dreams
        </Text>

        <Stack direction={'row'} gap={'5'}>
          <Button
            size={'lg'}
            px={'7'}
            rounded={'lg'}
            variant={'outline'}
            borderWidth={'1px'}
            borderBottomWidth={'3px'}
            borderColor={'#E5E5E5'}
            onClick={handleNextClick}
          >
            Log in
          </Button>
          <Button
            size={'lg'}
            px={'7'}
            rounded={'lg'}
            bg={'#BC3860'}
            borderWidth={'1px'}
            borderBottomWidth={'3px'}
            borderColor={'#A01B43'}
            onClick={handleNextClick}
          >
            Sign up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

interface MenuItemProps {
  children: React.ReactNode;
  isLast?: boolean;
  to?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link href={to} _focus={{ outline: 'none' }} _hover={{ textDecoration: 'none' }}>
      <Text display="block" fontWeight="bold" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
