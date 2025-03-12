import { Box, Text, Flex, Image, VStack } from '@chakra-ui/react';
import { CircleX } from 'lucide-react';

interface MoodModalProps {}

export default function MoodModal({}: MoodModalProps) {
  return (
    <Box background={'white'} rounded={'xl'} width={425} shadow={'md'} p={10} position={'relative'}>
      <Box position={'absolute'} top={4} right={5}>
        <CircleX color="#44444A" />
      </Box>
      <Text fontWeight={'semibold'} fontSize={24}>
        How are you feeling today?
      </Text>
      <Text fontWeight={'semibold'} fontSize={14} color={'#747474'} mt={1}>
        *Disclaimer: Information will not be shared.
      </Text>

      <Flex justify={'space-between'} mt={7}>
        <VStack>
          <Image src="/happy.svg"></Image>
          <Text fontWeight={'semibold'} fontSize={18}>
            Happy
          </Text>
        </VStack>
        <VStack>
          <Image src="/neutral.svg"></Image>
          <Text fontWeight={'semibold'} fontSize={18}>
            Neutral
          </Text>
        </VStack>
        <VStack>
          <Image src="/sad.svg"></Image>
          <Text fontWeight={'semibold'} fontSize={18}>
            Sad
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
