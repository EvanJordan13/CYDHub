import { Text, Box, Flex, Heading, Image } from '@chakra-ui/react';

interface PlaygroundSectionProps {
  points: number;
}

export default function PlaygroundSection({ points }: PlaygroundSectionProps) {
  return (
    <Box width={'100%'}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        p={'32px 48px 24px 48px'}
        boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      >
        <Heading fontSize={'40px'} fontWeight={700} lineHeight={'normal'}>
          Code your Dreams
        </Heading>
        <Flex flexDirection={'row'} gap={'8px'} alignItems={'center'}>
          <Image src="/streak-card-icon.svg" alt="streak" width={19} height={8} />
          <Text fontSize={'32px'} fontWeight={700} lineHeight={'normal'} color={'#FFCE29'}>
            {points}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
