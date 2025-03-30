import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';
import InformationCard from '@/src/components/InformationCard';
import Button from '@/src/components/Button';

export default function LandingPage() {
  return (
    <VStack w="100vw" minH="100vh" bg="white" p={8} position="relative" overflow="hidden" zIndex={-3}>
      <VStack w="100%" h="100%">
        <VStack paddingY="100px">
          <Text fontSize="clamp(14px, 1.18vw, 18px)" color="Slate" fontFamily={'Poppins'} fontWeight={700}>
            Welcome to the Student Hub
          </Text>
          <Text fontSize="clamp(36px, 4.7vw, 72px)" color="Flamingo" fontWeight={700}>
            Code Your Dreams
          </Text>
          <HStack paddingY="30px">
            <Button type="secondary" text="Learn More" width="178px" height="56px" pageColor="flamingo" />
            <Button type="primary" text="Get Started" width="178px" height="56px" pageColor="flamingo" />
          </HStack>
        </VStack>
        <Box position="relative" width="100vw" mx="auto" display="flex" justifyContent="center">
          <Box
            position="absolute"
            top="100px"
            left="-50%"
            width="200%"
            paddingBottom="100%"
            bg="Flamingo"
            borderRadius="50%"
            zIndex={-1}
          />

          <Image src="/temp-screen.png" width="64vw" height="auto" zIndex={1} position="relative" />
        </Box>

        <HStack marginTop="130px" gap="4vw" marginBottom="100px">
          <InformationCard
            title="Centralized Learning Dashboard"
            description="Easily access all your courses, assignments, and learning materials in one place."
          />
          <InformationCard
            title="Centralized Learning Dashboard"
            description="Easily access all your courses, assignments, and learning materials in one place."
          />
          <InformationCard
            title="Centralized Learning Dashboard"
            description="Easily access all your courses, assignments, and learning materials in one place."
          />
          <Box
            position="absolute"
            left="-50%"
            transform="translateY(50%)"
            width="200%"
            paddingBottom="100%"
            bg="white"
            zIndex={-1}
          />
        </HStack>

        <HStack gap={60}>
          <Image src="/class-path.png" width="46vw" height="auto" />
          <VStack width="353px" height="221px">
            <Text fontSize="clamp(24px, 3.1vw, 48px)" color="Flamingo" fontFamily="Poppins" fontWeight={700}>
              Gamified Learning
            </Text>
            <Text fontSize="clamp(14px, 1.18vw, 18px)" color="Slate" fontWeight={500} fontFamily="Poppins">
              Turning challenges into rewarding experiences makes coding fun and efficient.
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
