'use client';

import { Box, Text, Flex, Image, VStack, Button, IconButton } from '@chakra-ui/react';
import { CircleX } from 'lucide-react';

interface MoodModalProps {
  onClose: () => void;
}

export default function MoodModal({ onClose }: MoodModalProps) {
  return (
    <Box background={'white'} rounded={'xl'} width={425} shadow={'md'} p={10} position={'relative'}>
      <IconButton position={'absolute'} bg={'transparent'} top={3} right={4} onClick={onClose}>
        <CircleX color="#44444A" />
      </IconButton>
      <Text fontWeight={'semibold'} fontSize={24}>
        How are you feeling today?
      </Text>
      <Text fontWeight={'semibold'} fontSize={14} color={'#747474'} mt={1}>
        *Disclaimer: Information will not be shared.
      </Text>

      <Flex justify={'space-between'} mt={7}>
        <VStack>
          <IconButton aria-label="happy" height={24} rounded={'3xl'} bg={'transparent'} onClick={() => {}}>
            <Image
              src="/happy.svg"
              width={24}
              _hover={{
                filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))',
              }}
            />
          </IconButton>
          <Text fontWeight={'semibold'} fontSize={18}>
            Happy
          </Text>
        </VStack>
        <VStack>
          <IconButton aria-label="neutral" height={24} rounded={'3xl'} bg={'transparent'} onClick={() => {}}>
            <Image
              src="/neutral.svg"
              width={24}
              _hover={{
                filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))',
              }}
            />
          </IconButton>
          <Text fontWeight={'semibold'} fontSize={18}>
            Neutral
          </Text>
        </VStack>
        <VStack>
          <IconButton aria-label="sad" height={24} rounded={'3xl'} bg={'transparent'} onClick={() => {}}>
            <Image
              src="/sad.svg"
              width={24}
              _hover={{
                filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))',
              }}
            />
          </IconButton>
          <Text fontWeight={'semibold'} fontSize={18}>
            Sad
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
