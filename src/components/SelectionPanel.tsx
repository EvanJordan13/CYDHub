'use client';

import { HStack, VStack, Text, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';

enum Tab {
  Assignments = 0,
  Materials = 1,
  Announcements = 2,
  Feedback = 3,
}

interface SelectionPanelProps {
  headers: string[];
  currentTab: number;
  setCurrentTab: (value: Tab) => void;
}

const SelectionPanel = ({ headers, currentTab, setCurrentTab }: SelectionPanelProps) => {
  return (
    <HStack width={'40vw'} p={'5px'} display="flex" justifyContent={'space-between'}>
      {headers.map((header, index) => (
        <Button
          key={header}
          borderRadius={'10px'}
          color={index == currentTab ? 'white' : 'black'}
          backgroundColor={index == currentTab ? '#BC3860' : 'white'}
          _hover={{ color: 'white', backgroundColor: '#BC3860' }}
          py={'5px'}
          px={'20px'}
          onClick={() => setCurrentTab(index)}
        >
          {header}
        </Button>
      ))}
    </HStack>
  );
};

export default SelectionPanel;
