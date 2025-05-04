import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { User } from '@prisma/client';

interface HeaderProps {
    userInfo: User | null;
}

export default function Header({ userInfo }: HeaderProps) {
    return (
        <Flex flexDirection={'row'} justifyContent={'space-between'} p="42px 48px 36px 48px" shadow={'sm'} width={'100%'}>
            <Heading fontSize="40px" fontWeight={700} lineHeight={'48px'}>
                Welcome, {userInfo?.name}
            </Heading>
            <Flex flexDirection={'row'} gap={'8px'} alignItems={'center'}>
                <Image src="/streak-card-icon.svg" alt="streak" width={19} />
                <Text fontSize={'32px'} fontWeight={700} lineHeight={'normal'} color={'#FFCE29'}>
                    {userInfo?.points}
                </Text>
            </Flex>
        </Flex>
    );
}