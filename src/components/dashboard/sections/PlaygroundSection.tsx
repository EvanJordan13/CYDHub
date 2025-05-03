import React, { useState } from 'react';
import { Text, Box, Flex, Heading, Image, Tabs } from '@chakra-ui/react';
import BlocklyEditor from '../../BlocklyEditor';
import CodeEditor from '../../CodeEditor';

interface PlaygroundSectionProps {
  points: number;
}

export default function PlaygroundSection({ points }: PlaygroundSectionProps) {
  const [activeTab, setActiveTab] = useState('blocks');

  return (
    <Box width={'100%'}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        p={'32px 48px 24px 48px'}
        boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      >
        <Heading fontSize={'40px'} fontWeight={700} lineHeight={'normal'}>
          Code Editor
        </Heading>
        <Flex flexDirection={'row'} gap={'8px'} alignItems={'center'}>
          <Image src="/streak-card-icon.svg" alt="streak" width={19} height={8} />
          <Text fontSize={'32px'} fontWeight={700} lineHeight={'normal'} color={'#FFCE29'}>
            {points}
          </Text>
        </Flex>
      </Flex>
      <Box mt={8} ml={12} mb={8}>
        <Text textStyle="2xl" fontWeight="bold" mb={3}>
          Welcome to your own playground!
        </Text>
        <Text>Write, run, and debug code on your own, and have fun experimenting to sharpen your skills.</Text>
      </Box>
      <Tabs.Root
        variant="enclosed"
        ml={12}
        fitted
        defaultValue="blocks"
        onValueChange={value => setActiveTab(value.value)}
        style={{ width: '10rem' }}
      >
        <Tabs.List>
          <Tabs.Trigger
            value="blocks"
            _selected={{
              bg: 'Aqua',
              color: 'white',
            }}
          >
            Blocks
          </Tabs.Trigger>
          <Tabs.Trigger
            value="text"
            _selected={{
              bg: 'Aqua',
              color: 'white',
            }}
          >
            Text
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Box mt={4} ml={12} mb={16}>
        {activeTab === 'blocks' && <BlocklyEditor />}
        {activeTab === 'text' && <CodeEditor />}
      </Box>
    </Box>
  );
}
