'use client';

import { Box, Text, Flex, Center } from '@chakra-ui/react';
import { ProgressCircle } from '@chakra-ui/react';
import { InfoTip } from '@/src/components/ui/toggle-tip';

interface StreakCardProps {
  currentPoints: number;
  nextRewardPoints: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ currentPoints = 0, nextRewardPoints = 0, ...rest }) => {
  const progress = (currentPoints / nextRewardPoints) * 100;

  return (
    <Box width="100%" bg={'white'} borderRadius={'md'} shadow={'sm'} paddingX={5} paddingY={6} {...rest}>
      <Flex direction={'column'} justify={'center'} align={'center'}>
        <Flex gap={0.5} align={'center'} justify={'center'} mb={8}>
          <Text fontWeight={'bold'}>Your Points</Text>
          <InfoTip content="Earn points by completing your assignments" />
        </Flex>

        <Center transform={'scale(2.5)'} transformOrigin={'top'} mb={32}>
          <ProgressCircle.Root value={progress} size={'xl'}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" stroke={'#FFC700'} />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <Text position={'absolute'} fontWeight={'bold'} color={'#FFC700'} fontSize={'16px'}>
            {currentPoints}
          </Text>
        </Center>

        <Center width="100%" bg={'white'} borderRadius={'md'} shadow={'sm'} paddingX={2} paddingY={3} {...rest}>
          <Text textAlign={'center'} fontSize={'14px'} color={'#5A5A63'}>
            {nextRewardPoints - currentPoints} points away from next reward!
          </Text>
        </Center>
      </Flex>
    </Box>
  );
};

export default StreakCard;
