import React from "react"
import { Box, Text, Image, Link, Stack, Button, Flex } from "@chakra-ui/react"

export default function Logo() {
    return (
        <Box py='10px' px='25px' shadow='sm'>
            <Flex direction={'row'}>
                <Image src="/logo.png" alt="Logo" height='50px' mr="8"
                />

                <Stack
                    direction={'row'}
                    marginEnd="auto"
                    gap={"10"}
                >
                    <MenuItem to="/">Dashboard</MenuItem>
                    <MenuItem to="/">Classroom</MenuItem>
                    <MenuItem to="/">Pricing</MenuItem>
                    <MenuItem to="/">Learn</MenuItem>
                </Stack>

                <Stack direction={'row'} >
                    <Button rounded={'full'} variant={'outline'} borderWidth={'2px'} borderColor={"black"}>
                        Log in
                    </Button>
                    <Button rounded={'full'}>
                        Sign up
                    </Button>
                </Stack>
            </Flex>
        </Box >
    )
}

interface MenuItemProps {
    children: React.ReactNode;
    isLast?: boolean;
    to?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link href={to} _focus={{ outline: 'none' }}>
            <Text
                display="block"
                fontWeight="bold"
                {...rest}
            >
                {children}
            </Text>
        </Link>
    )
}