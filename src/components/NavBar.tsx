import React from 'react';
import { Box, Text, Image, Link, Stack, Button, Flex, Center } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Box py="5" px="12">
      <Flex direction={'row'} align="center" justify={'space-between'}>
        <Text
          fontFamily="'Poppins', sans-serif"
          fontSize="3xl"
          fontWeight="bold"
          color="#BC3860"
          whiteSpace="nowrap"
          mr="4"
          _hover={{ cursor: 'default' }}
        >
          Code Your Dreams
        </Text>

        <Stack direction={'row'} gap={'10'}>
          <MenuItem to="/">Dashboard</MenuItem>
          <MenuItem to="/">Classroom</MenuItem>
          <MenuItem to="/">Pricing</MenuItem>
          <MenuItem to="/">Learn</MenuItem>

        </Stack>

        <Stack direction={'row'} gap={'5'}>
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
