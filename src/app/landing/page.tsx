'use client';

import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';
import InformationCard from '@/src/components/InformationCard';
import Button from '@/src/components/Button';
import NavBar from '@/src/components/NavBar';
import Footer from '@/src/components/Footer';
import { Shrub, AwardIcon } from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <VStack w="100vw" minH="100vh" bg="white" p={8} position="relative" overflow="hidden" zIndex={1}>
        <VStack w="100%" h="100%">
          <VStack paddingY="100px">
            <Text fontSize="clamp(14px, 1.18vw, 18px)" color="Slate" fontFamily={'Poppins'} fontWeight={700}>
              Welcome to the Student Hub
            </Text>
            <Text fontSize="clamp(36px, 4.7vw, 72px)" color="Flamingo" fontWeight={700}>
              Code Your Dreams
            </Text>
            <HStack paddingY="30px">
              <Button
                type="secondary"
                text="Learn More"
                width="178px"
                height="56px"
                pageColor="flamingo"
                onClick={() => (window.location.href = 'https://www.codeyourdreams.org/')}
              />
              <Button
                type="primary"
                text="Get Started"
                width="178px"
                height="56px"
                pageColor="flamingo"
                onClick={() => (window.location.href = '/api/auth/login')}
              />
            </HStack>
          </VStack>
          <Box
            position="relative"
            width="100%"
            mx="auto"
            display="flex"
            justifyContent="center"
            borderColor={'red.400'}
          >
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

            <Image
              src="/program-screen.png"
              width="64vw"
              height="auto"
              zIndex={1}
              position="relative"
              boxShadow="lg"
              borderRadius={'lg'}
              alt="program-screen"
            />
          </Box>

          <HStack marginTop="130px" gap="4vw" width="100%" marginBottom="100px" justifyContent={'center'}>
            <InformationCard
              title="Learn and Build at Your Own Pace"
              description="Access all your program materials — from your syllabus and slides to handouts and resources — and practice coding in your own personalized code playground."
            />
            <InformationCard
              title="Connect and Grow Together"
              description="Join discussions, stay on top of important dates with the calendar, and collaborate with your peers as you build projects and complete assignments."
              icon={Shrub}
            />
            <InformationCard
              title="Earn Rewards &  Opportunities"
              description="Collect points for your progress, turn them in for real rewards, and discover scholarships, internships, and other opportunities to level up your future."
              icon={AwardIcon}
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
            <Image src="/class-path.png" width="46vw" alt="class-path" marginBottom="-43px" />
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
      <Footer />
    </>
  );
}
