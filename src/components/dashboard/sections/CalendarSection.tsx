import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Calendar from "../calendar/Calendar"
import { Assignment, ModuleMaterial, User } from '@prisma/client';
import Head from "next/head";

interface CalendarSectionProps {
    userInfo: User | null;
    assignments: Assignment[];
    materials: ModuleMaterial[];
}

export default function CalendarSection({ userInfo, assignments, materials }: CalendarSectionProps) {
    return (
        <Box width={'100%'}>
            <Flex flexDirection={'row'} justifyContent={'space-between'} p="32px 48px 16px 48px">
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

            <Box direction={'column'} mx={'48px'} mt={8} mb={8}>
                <Heading fontSize="35px" fontWeight={700}>
                    Calendar
                </Heading>

                <Text fontSize="16px" fontWeight={500} mt={2} mb={8}>
                    Take a look and schedule out your day to help keep you on track.
                </Text>

                <Calendar assignments={assignments} materials={materials} />
            </Box>
        </Box>
    );
}