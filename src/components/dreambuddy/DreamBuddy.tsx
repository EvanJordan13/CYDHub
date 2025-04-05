import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Callout from './Callout';
import { Portal } from '@chakra-ui/react';
import { useState } from 'react';

const rotateIn = keyframes`
  0% {
    transform: translateX(100px) rotate(-90deg) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translateX(100px) rotate(20deg) scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: translateX(25px) rotate(-10deg) scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: translateX(0) rotate(-28deg) scale(1);
    opacity: 1;
  }
`;

const rotateOut = keyframes`
  0% {
    transform: translateX(0) rotate(-28deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(25px) rotate(-10deg) scale(0.9);
    opacity: 0.9;
  }
  70% {
    transform: translateX(100px) rotate(20deg) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateX(100px) rotate(-90deg) scale(0.3);
    opacity: 0;
  }
`;

const bobRotated = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(-28deg);
  }
  50% {
    transform: translateY(-5px) rotate(-28deg);
  }
`;

const bob = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface DreamBuddyProps {
  calloutType?: 'greeting' | 'gainPoints';
  numPointsGained?: number;
  userName?: string;
  isVisible?: boolean;
  onHide?: () => void;
}

export default function DreamBuddy({
  calloutType,
  numPointsGained = 0,
  userName,
  isVisible = true,
  onHide,
}: DreamBuddyProps) {
  const handleClick = () => {
    onHide?.();
  };

  return (
    <Portal>
      <Box position="fixed" bottom="25px" right="-50px" zIndex={1000} userSelect="none">
        <Flex position="relative" flexDirection="row" alignItems="center">
          {calloutType && (
            <Box display={isVisible ? 'block' : 'none'}>
              <Callout
                type={calloutType}
                numPointsGained={numPointsGained}
                userName={userName}
                animation={`${bounceIn} 0.6s ease-out 0.8s forwards, ${bob} 2s ease-in-out infinite 0.8s`}
              />
            </Box>
          )}
          <Box position="relative" width="142px" height="142px" mb="-90px" ml="25px">
            <Box
              position="absolute"
              animation={
                isVisible
                  ? `${rotateIn} 0.8s ease-out forwards, ${bobRotated} 2s ease-in-out infinite 1.2s`
                  : `${rotateOut} 0.8s ease-out forwards`
              }
              onClick={handleClick}
              cursor="pointer"
            >
              <Image src="/dream-buddy.svg" alt="Dream Buddy" width={100} height={100} draggable={false} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Portal>
  );
}
