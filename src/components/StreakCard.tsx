'use client';

import { Box, Text, Flex, Center } from '@chakra-ui/react';
import { ProgressCircle } from '@chakra-ui/react';
import { InfoTip } from '@/src/components/ui/toggle-tip';
import { motion, useAnimation, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StreakCardProps {
  currentPoints: number;
  nextRewardPoints: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ currentPoints = 0, nextRewardPoints = 0, ...rest }) => {
  const progress = Math.min((currentPoints / nextRewardPoints) * 100, 100);
  const progressControls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate progress circle
    progressControls.start({
      pathLength: progress / 100,
      transition: { duration: 1.5, ease: 'easeOut' },
    });

    // Animate the count
    const controls = animate(0, currentPoints, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        setCount(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [currentPoints, progress, progressControls]);

  return (
    <Box
      width="343px"
      bg={'white'}
      borderRadius={'md'}
      boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      paddingX={5}
      paddingY={6}
      {...rest}
    >
      <Flex direction={'column'} justify={'center'} align={'center'}>
        <Flex gap={0.5} align={'center'} justify={'center'} mb={8}>
          <Text fontWeight={'bold'}>Your Points</Text>
          <InfoTip content="Earn points by completing your assignments" />
        </Flex>

        <Center transform={'scale(2.5)'} transformOrigin={'top'} mb={32}>
          <ProgressCircle.Root value={progress} size={'xl'}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={progressControls}
                cx="50%"
                cy="50%"
                r="44%"
                fill="none"
                stroke="#FFC700"
                strokeWidth="7.7"
                strokeLinecap="round"
              />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <Text position={'absolute'} fontWeight={'bold'} color={'#FFC700'} fontSize={'16px'}>
            {count}
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
