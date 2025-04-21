import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';
import InformationCard from '@/src/components/InformationCard';
import Button from '@/src/components/Button';
import NavBar from '@/src/components/NavBar';
import Footer from '@/src/components/Footer';

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <VStack w="100vw" minH="100vh" bg="white" p={8} position="relative" overflow="hidden" zIndex={-3}>
        <VStack w="100%" h="100%">
          <VStack paddingY="100px">
            <Text fontSize="clamp(14px, 1.18vw, 50px)" color="Slate" fontFamily={'Poppins'} fontWeight={700}>
              Welcome to the Student Hub
            </Text>
            <Text fontSize="clamp(36px, 4.7vw, 100px)" color="Flamingo" fontWeight={700}>
              Code Your Dreams
            </Text>
            <HStack paddingY="30px">
              <Button
                type="secondary"
                text="Learn More"
                width="clamp(178px,12.36vw,300px)"
                height="clamp(56px,5.4vh,120px)"
                pageColor="flamingo"
              />
              <Button
                type="primary"
                text="Get Started"
                width="clamp(178px,12.36vw,300px)"
                height="clamp(56px,5.4vh,120px)"
                pageColor="flamingo"
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

          <HStack gap={60} height="40%">
            <Image src="/class-path.png" width="46vw" height="auto" alt="class-path" />
            <VStack width="24.5vw" height="full" alignItems="left">
              <Text fontSize="clamp(24px, 3.3vw, 100px)" color="Flamingo" fontFamily="Poppins" fontWeight={700}>
                Gamified Learning
              </Text>
              <Text fontSize="clamp(14px, 1.25vw, 50px)" color="Slate" fontWeight={500} fontFamily="Poppins">
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
