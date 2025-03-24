import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react";
import InformationCard from "@/src/components/InformationCard";
import Button from "@/src/components/Button";

export default function LandingPage() {
    return (
        <VStack w="100vw" minH="100vh" bg="white" p={8} position="relative" overflow="hidden" zIndex={-3}>
            <Box
                position="absolute"
                bottom={-900}
                left="50%"
                transform="translateX(-50%)"
                width="200vw" 
                height="170vw" 
                bg={"Flamingo"} 
                borderRadius="50%"  
                zIndex={-2} 
            />
            <Box
                position="absolute"
                bottom={-1420}  
                left="100%"
                transform="translateX(-100%)"
                width="100vw"  
                height="150vw"
                bg={"White"} 
                zIndex={-1}  
            />              
            <VStack>
                <VStack paddingY="100px">
                <Text fontSize="18px" color="Slate" fontFamily={"Poppins"} fontWeight={700}>Welcome to the Student Hub</Text>
                <Text fontSize="72px" color="Flamingo" fontWeight={700}>Code Your Dreams</Text>
                <HStack paddingY="30px">
                    <Button type="secondary" text="Learn More" width="178px" height="56px" pageColor="flamingo"/>
                    <Button type="primary" text="Get Started" width="178px" height="56px" pageColor="flamingo"/>
                </HStack>
                </VStack>
                <Image src="/temp-screen.png" width="931px" height="596px" />
                <HStack marginTop="130px" gap="24px" marginBottom="100px">
                    <InformationCard  title= "Centralized Learning Dashboard" description= "Easily access all your courses, assignments, and learning materials in one place."  />
                    <InformationCard  title= "Centralized Learning Dashboard" description= "Easily access all your courses, assignments, and learning materials in one place."  />
                    <InformationCard  title= "Centralized Learning Dashboard" description= "Easily access all your courses, assignments, and learning materials in one place."  />
                </HStack>
                <HStack gap={60}>
                    <Image src="/class-path.png" width="663px" height="620px" />
                    <VStack width="353px" height="221px">
                        <Text fontSize="48px" color="Flamingo" fontFamily="Poppins" fontWeight={700}>Gamified Learning</Text>
                        <Text fontSize="18px" color="Slate" fontWeight={500} fontFamily="Poppins">Turning challenges into rewarding experiences makes coding fun and efficient.</Text>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}