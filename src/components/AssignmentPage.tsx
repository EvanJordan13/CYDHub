import { useState } from 'react';
import { Box, Text, IconButton, Collapsible, Span, Center, Stack } from '@chakra-ui/react';
import Resource from './Resource';
import { ChevronDown, ChevronUp, ClipboardMinus, Video } from 'lucide-react';

interface AssignmentPageProps {
    assignmentNumber: number;
    assignmentTitle: string;
    dueDate: string;
    numQuestions: number;
    description: string;
}

export default function AssignmentPage({ assignmentNumber, assignmentTitle, dueDate, numQuestions, description }: AssignmentPageProps) {

    return (
        <Box>
            <Text fontWeight={'bold'} fontSize={'24px'}>
                Assignment #{assignmentNumber}: {assignmentTitle}
            </Text>

            <Stack direction={'row'} spaceX={2} mt={6}>
                <Box bg={'white'} borderWidth={'1px'} borderColor={'Aqua'} borderRadius={'lg'} shadow={'sm'} width={'fit-content'} px={3} py={2}>
                    <Text>
                        <Box as="span" fontWeight="bold">Due Date:</Box> {dueDate}
                    </Text>
                </Box>

                <Box bg={'white'} borderWidth={'1px'} borderColor={'Aqua'} borderRadius={'lg'} shadow={'sm'} width={'fit-content'} px={3} py={2}>
                    <Text>
                        <Box as="span" fontWeight="bold"># of Questions:</Box> {numQuestions}
                    </Text>
                </Box>
            </Stack>

            <Text fontWeight={'bold'} fontSize={'18px'} mt={6}>
                Instructions:
            </Text>

            <Text mt={2}>
                {description}
            </Text>



        </Box >
    )

}