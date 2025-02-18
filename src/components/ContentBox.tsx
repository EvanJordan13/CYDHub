'use client';

import { HStack, VStack, Text, Button } from '@chakra-ui/react';

interface ContentBoxProps {
  title: string;
  buttonText: string;
}

const ContentBox = ({ title, buttonText }: ContentBoxProps) => {
  return (
    <HStack
      borderWidth={'1px'}
      borderColor={'gray'}
      borderRadius={'10px'}
      w="50%"
      justifyContent={'space-between'}
      p={'10px'}
      marginBottom={2}
    >
      <Text color="black">{title}</Text>
      <Button borderRadius={'10px'} backgroundColor={buttonText === 'Start Assignment' ? 'pink' : 'lightgreen'} w="30%">
        {buttonText}
      </Button>
    </HStack>
  );
};

export default ContentBox;
