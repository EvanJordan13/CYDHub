import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex, Image } from '@chakra-ui/react';
import { Program } from '@prisma/client';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Box
      width="fit-content"
      minWidth={340}
      maxWidth={345}
      bg={'white'}
      borderRadius={'12px'}
      boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
      transition={'all 0.2s ease-in-out'}
      p={'24px 32px'}
    >
      <Flex direction={'row'} gap={'16px'} height="100%">
        <Box>
          <Image src="program-card-image.svg" alt="program-card" width={20} draggable={false} />
          <Box direction={'column'} mt={'8px'}>
            <Text fontWeight={600} color={'Lavender'} fontSize={'14px'}>
              {program.subject}
            </Text>
            <Text fontWeight={600} color={'Flamingo'} fontSize={'24px'} lineClamp={1}>
              {program.name}
            </Text>
            <Text lineClamp="2" fontWeight={500} color={'Slate'} fontSize={'16px'}>
              {program.description}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
