import { Box, Image, Flex, Text } from '@chakra-ui/react';

export default function OnboardingPage() {
  return (
    <Box bg={'white'} height={'100vh'} width={'100vw'}>
      <Box margin={"39px"} padding={"39px"} width={"100vw"}>
        <Image src="cyd-logo.svg" alt="Code Your Dreams" width={'283px'}/>
      </Box>
      {/* <Image src='cyd-onboard-ellipse.svg' alt="Code Your Dreams" width={'200px'} alignItems={"end"}/> */}
      <Box marginTop={"130px"} marginLeft={"145px"}>
        <Flex direction={"column"} gap={"24px"}>
          <Box>
            <Text width={"448px"} height={"60px"} fontWeight={"bold"} fontSize={"40px"} color={"#BC3860"}>
              Welcome to CYD Hub!
            </Text>
            <Text width={"448px"} height={"28px"} fontWeight={"medium"} fontSize={"18px"} color={"black"}>
              Please enter information about yourself.
            </Text>
          </Box>
          <Flex direction={"column"} gap={"16px"}>
            <Box gap={"6px"}>
              <Text color={"black"} fontSize={"14px"} fontWeight={"medium"}>
                Name
                <Text as="span" color="#BC3860">
                  *
                </Text>
              </Text>
              <Box width={"460px"} height={"64px"} borderWidth={"1.5px"} borderColor={"black"}>

              </Box>
            </Box>
            <Box gap={"6px"}>
              <Text color={"black"} fontSize={"14px"} fontWeight={"medium"}>
                Email
              </Text>
              <Box width={"460px"} height={"64px"} borderWidth={"1.5px"} borderColor={"black"}>

              </Box>
            </Box>
            <Flex direction={"row"} gap={"16px"}>
              <Flex direction={"column"} gap={"6px"}>
                <Text color={"black"} fontSize={"14px"} fontWeight={"medium"}>
                  Pronouns
                  <Text as="span" color="#BC3860">
                    *
                  </Text>
                </Text>
                <Box width={"165px"} height={"64px"} borderWidth={"1.5px"} borderColor={"black"}>

                </Box>
              </Flex>

              <Flex direction={"column"} gap={"6px"}>
                <Text color={"black"} fontSize={"14px"} fontWeight={"medium"}>
                  Gender
                  <Text as="span" color="#BC3860">
                    *
                  </Text>
                </Text>
                <Box width={"279px"} height={"64px"} borderWidth={"1.5px"} borderColor={"black"}>

                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box height={"28px"} width={"460px"}>

          </Box>
        </Flex>
      </Box>
    </Box>
  );
}