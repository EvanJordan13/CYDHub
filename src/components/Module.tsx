'use client';

import { useState } from 'react';
import { Box, Text, IconButton, Collapsible } from '@chakra-ui/react';
import Resource from './Resource';
import { ChevronDown, ChevronUp, ClipboardMinus, Video } from 'lucide-react';

export default function Module() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root marginTop={9} width={'96.5%'} defaultOpen={true}>
      <Box
        borderColor={'Aqua'}
        backgroundColor={'Aqua'}
        borderWidth={3}
        height={16}
        borderTopRadius={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
      >
        <Text color={'white'} fontWeight={'bold'}>
          Week 1: Friday, February 28th - March 5th
        </Text>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          variant="plain"
          colorScheme="whiteAlpha"
          aria-label="Toggle section"
          as={Collapsible.Trigger}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </IconButton>
      </Box>
      <Collapsible.Content>
        <Box borderColor={'#B3B3BB'} borderWidth={1.5} height={72} borderBottomRadius={5}>
          <Resource title={'Syllabus'} dueDate={'March 1st'} icon={<ClipboardMinus />} resourceType={'assignment'} />
          <Resource title={'Introduction to HTML'} dueDate={'March 1st'} icon={<Video />} resourceType={'assignment'} />
          <Resource title={'Lecture'} dueDate={'March 1st'} icon={<Video />} resourceType={'material'} />
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
