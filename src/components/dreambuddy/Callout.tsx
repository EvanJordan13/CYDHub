import { Box, Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

interface CalloutProps {
  type: 'greeting' | 'gainPoints' | 'save';
  numPointsGained?: number;
  userName?: string;
  animation?: string;
}

const CalloutPointer = (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 5.63398C11.1667 6.01888 11.1667 6.98113 10.5 7.36603L2.25 12.1292C1.58333 12.5141 0.75 12.0329 0.75 11.2631L0.75 1.73686C0.75 0.967059 1.58333 0.485935 2.25 0.870835L10.5 5.63398Z"
      fill="currentColor"
    />
  </svg>
);

const greetings = [
  'Have a great day! ❤️',
  "Let's learn something new today! 💻",
  "High five! You're crushing it! 🙌",
  "You've got this! 🚀",
  "You're a coding rockstar! 🎸",
  "Let's learn and have fun! ✨",
];

const timeBasedIcons = {
  morning: '🌞',
  afternoon: '☀️',
  evening: '🌙',
};

function isFirstLoginOfDay(): boolean {
  if (typeof window === 'undefined') return false;
  const lastLoginTime = localStorage.getItem('lastLoginTime');
  const now = new Date();
  if (!lastLoginTime) {
    localStorage.setItem('lastLoginTime', now.toISOString());
    return true;
  }

  const lastLogin = new Date(lastLoginTime);
  const isSameDay =
    lastLogin.getDate() === now.getDate() &&
    lastLogin.getMonth() === now.getMonth() &&
    lastLogin.getFullYear() === now.getFullYear();
  if (!isSameDay) {
    localStorage.setItem('lastLoginTime', now.toISOString());
    return true;
  }

  return false;
}

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

export default function Callout({ type = 'greeting', numPointsGained = 0, animation, userName }: CalloutProps) {
  const [effectiveMessage, setEffectiveMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const firstLogin = isFirstLoginOfDay();
      const tod = getTimeOfDay();
      const name = userName?.split(' ')[0];
      const randomG = greetings[Math.floor(Math.random() * greetings.length)];

      switch (type) {
        case 'greeting':
          setEffectiveMessage(firstLogin && name ? `Good ${tod} ${name}! ${timeBasedIcons[tod]}` : randomG);
          break;
        case 'gainPoints':
          setEffectiveMessage(`You've gained ${numPointsGained} points!`);
          break;
        case 'save':
          setEffectiveMessage(`Code locally Saved Successfully!`);
          break;
        default:
          setEffectiveMessage(greetings[0]);
      }
    } else {
      switch (type) {
        case 'greeting':
          setEffectiveMessage(greetings[0]);
          break;
        case 'gainPoints':
          setEffectiveMessage(`You've gained ${numPointsGained} points!`);
          break;
        case 'save':
          setEffectiveMessage(`Code locally Saved Successfully!`);
          break;
        default:
          setEffectiveMessage(greetings[0]);
      }
    }
  }, [isClient, type, userName, numPointsGained]);

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      position="relative"
      p="12px 16px"
      color="white"
      bg="Aqua"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      borderRadius="10px"
      w="fit-content"
      opacity={0}
      animation={animation}
    >
      {numPointsGained > 0 && (
        <Box marginRight="10px">
          <Image alt="energy" src="/streak-card-icon.svg" width={15} height={23} />
        </Box>
      )}
      <Text>{effectiveMessage}</Text>
      <Box position="absolute" right="-9px" color="Aqua">
        {CalloutPointer}
      </Box>
    </Flex>
  );
}
