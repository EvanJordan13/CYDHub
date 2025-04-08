'use client';

import React from 'react';
import { Box, Text, Link, Stack, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NavBar() {
  const router = useRouter();
  const { user, isLoading } = useUser();

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
          {!isLoading && !user ? (
            <>
              <Link href="//api/auth/login">
                <Button
                  size={'lg'}
                  px={'7'}
                  rounded={'lg'}
                  variant={'outline'}
                  borderWidth={'1px'}
                  borderBottomWidth={'3px'}
                  borderColor={'#E5E5E5'}
                >
                  Log in
                </Button>
              </Link>
              <Link href="/api/auth/login?screen_hint=signup">
                <Button
                  size={'lg'}
                  px={'7'}
                  rounded={'lg'}
                  bg={'#BC3860'}
                  borderWidth={'1px'}
                  borderBottomWidth={'3px'}
                  borderColor={'#A01B43'}
                >
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/api/auth/logout">
                <Button
                  size={'lg'}
                  px={'7'}
                  rounded={'lg'}
                  bg={'#BC3860'}
                  borderWidth={'1px'}
                  borderBottomWidth={'3px'}
                  borderColor={'#A01B43'}
                >
                  Log out
                </Button>
              </Link>
            </>
          )}
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
