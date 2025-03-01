import Link from 'next/link';
import { Box, Text, Link as ChakraLink, Flex, Image } from '@chakra-ui/react';
import { Program } from '@prisma/client';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link href="/" passHref>
      <Box
        height={136}
        width={420}
        bg={'white'}
        borderWidth={'2px'}
        borderColor={'lightgray'}
        margin={20}
        borderRadius={'2xl'}
        borderBottomWidth={'6px'}
        _hover={{ bg: 'gray.100' }}
        transition={'linear'}
      >
        <Flex direction={'row'} gap={'7px'} alignItems={'center'}>
          <Image src="program-card-image.svg" marginTop={'12px'} marginLeft={'12px'} />
          <Flex direction={'column'} gap={'6px'} alignContent={'center'}>
            <Text marginTop={'22px'} width={'229px'} fontWeight={'bold'} color={'#6C757D'} fontSize={'24px'} truncate>
              {program.name}
            </Text>
            <Text width={'249px'} lineClamp="2" fontWeight={'bold'} color={'gray'} fontSize={'16px'}>
              {program.description}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
