'use client';

import { HStack, VStack, Text, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';

interface SelectionPanelProps {
  headers: string[];
}

const SelectionPanel = ({ headers }: SelectionPanelProps) => {
  return (
    <HStack borderWidth={'1px'} borderColor={'gray'} borderRadius={'10px'} p={'5px'} display="inline-block">
      {headers.map(header => (
        <Button key={header} borderRadius={'10px'} _hover={{ backgroundColor: 'pink' }} py={'5px'} px={'10px'}>
          {header}
        </Button>
      ))}
    </HStack>
  );
};

export default SelectionPanel;
