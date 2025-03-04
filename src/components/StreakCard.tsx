'use client';

import React, { useState } from 'react';
import {
    Box,
    Text,
    Image,
    Flex,
    Center,
} from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';

interface StreakCardProps {
    streak: string | number;
    message: string;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak, message, ...rest }) => {
    return (
        <Box width="100%" bg={'white'} borderRadius={'md'} shadow={'sm'} paddingX={5} paddingY={6} {...rest}>
            <Box as="span" display="inline-flex" alignItems="center">
                <Image src="streak-card-icon.svg" width={6} />
                <Text fontSize={48} fontWeight={'bold'} color={'#FFCE29'} marginLeft={3} marginTop={-4} marginBottom={-5}>
                    {streak}
                </Text>
            </Box>
            <Text fontSize={14} fontWeight={'bold'} marginTop={2}>
                {message}
            </Text>

            <Flex direction={'row'} justify={'space-between'} align={'center'} gap={1} marginX={1} marginTop={4}>
                <DayIcon day="M" />
                <DayIcon day="T" />
                <DayIcon day="W" />
                <DayIcon day="Th" />
                <DayIcon day="F" />
            </Flex>
        </Box>
    );
};

interface DayIconProps {
    day: string;
}

const DayIcon: React.FC<DayIconProps> = ({ day }) => {
    return (
        <Flex direction={'column'} justify={'center'} align={'center'}>
            <Center width={8} height={8} borderRadius={'full'} bg={'Flamingo'}>
                <Image src="streak-card-icon.svg" width={2.5} />
            </Center>
            <Text as={'span'} fontWeight={'bold'} marginTop={2}>
                {day}
            </Text>
        </Flex>
    );
};

export default StreakCard;
