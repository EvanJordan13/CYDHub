'use client';

import { Box, Text, Flex, Image, VStack, IconButton, Stack, Link } from '@chakra-ui/react';
import { CircleX, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';

interface MoodModalProps {
  onClose: () => void;
}

export default function MoodModal({ onClose }: MoodModalProps) {
  const [isSad, setIsSad] = useState(false);

  const openSadModal = () => {
    setIsSad(true);
  };

  return (
    <Box background={'white'} rounded={'xl'} width={425} shadow={'md'} p={10} position={'relative'}>
      <IconButton position={'absolute'} bg={'transparent'} top={3} right={4} onClick={onClose}>
        <CircleX color="#44444A" />
      </IconButton>
      {isSad ? <SadContent /> : <ModalContent openSadModal={openSadModal} closeModal={onClose} />}
    </Box>
  );
}

const ModalContent = ({ openSadModal, closeModal }: { openSadModal: () => void; closeModal: () => void }) => {
  return (
    <Box>
      <Text fontWeight={'semibold'} fontSize={24}>
        How are you feeling today?
      </Text>
      <Text fontWeight={'semibold'} fontSize={14} color={'#747474'} mt={1}>
        *Disclaimer: Information will not be shared.
      </Text>

      <Flex justify={'space-between'} mt={7}>
        <VStack>
          <IconButton aria-label="happy" height={24} rounded={'3xl'} bg={'transparent'} onClick={closeModal}>
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
          <IconButton aria-label="neutral" height={24} rounded={'3xl'} bg={'transparent'} onClick={closeModal}>
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
          <IconButton aria-label="sad" height={24} rounded={'3xl'} bg={'transparent'} onClick={openSadModal}>
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
};

const SadContent = () => {
  return (
    <Box>
      <Text fontWeight={'bold'} fontSize={'24px'}>
        It’s okay to feel sad
      </Text>

      <Text fontWeight={'medium'} fontSize={'14px'} color={'#747474'}>
        Here are some resources to cheer you up.
      </Text>

      <Stack direction={'column'} gap={3} mt={6}>
        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{
            transform: 'translateY(-2px)',
            textDecoration: 'none',
          }}
          transition="all 0.2s ease-in-out"
        >
          <Box bg={'Aqua'} borderRadius={'lg'} shadow={'sm'} width={'full'} color={'white'} px={3} py={2}>
            <Flex direction={'row'} align={'center'} gap={2}>
              <SquareArrowOutUpRight size={18} />
              <Text fontWeight={'medium'} fontSize={'14px'}>
                Resource #1
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{
            transform: 'translateY(-2px)',
            textDecoration: 'none',
          }}
          transition="all 0.2s ease-in-out"
        >
          <Box bg={'Flamingo'} borderRadius={'lg'} shadow={'sm'} width={'full'} color={'white'} px={3} py={2}>
            <Flex direction={'row'} align={'center'} gap={2}>
              <SquareArrowOutUpRight size={18} />
              <Text fontWeight={'medium'} fontSize={'14px'}>
                Resource #2
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{
            transform: 'translateY(-2px)',
            textDecoration: 'none',
          }}
          transition="all 0.2s ease-in-out"
        >
          <Box bg={'Lavender'} borderRadius={'lg'} shadow={'sm'} width={'full'} color={'white'} px={3} py={2}>
            <Flex direction={'row'} align={'center'} gap={2}>
              <SquareArrowOutUpRight size={18} />
              <Text fontWeight={'medium'} fontSize={'14px'}>
                Resource #2
              </Text>
            </Flex>
          </Box>
        </Link>
      </Stack>
    </Box>
  );
};
