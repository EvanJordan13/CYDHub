import { Box, Image, Flex, Text, Link } from '@chakra-ui/react';
import { Checkbox } from "../../components/ui/checkbox"
import Button from "../../components/Button"

export default function OnboardingPage() {
  return (
    <Box bg={'white'} height={'100vh'} width={'100vw'}>
      <Flex direction={"row"} justify={"space-between"} height={"100%"}>
      <Box marginTop={"10px"} padding={"20px"} width={"60%"}>
        <Image src="cyd-logo.svg" alt="Code Your Dreams" width={'283px'}/>
        <Box marginTop={"100px"} marginLeft={"145px"}>
            <Flex direction={"column"} gap={"24px"}>
              <Box>
                <Text width={"448px"} height={"60px"} fontWeight={"bold"} fontSize={"40px"} color={"#BC3860"} fontFamily={"Poppins"}>
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
              <Box height={"28px"} width={"460px"} marginBottom={"16px"}>
                <Checkbox variant={"subtle"} color={"black"} colorPalette={""}>
                  I certify that I have read the <Link color={"#4D80BB"} href="/" textDecoration={"underline"}>Terms of Conditions</Link>
                </Checkbox>
              </Box>
              <Button type={'primary'} text={"Next"} link={"/"} height={"64px"} width={"460px"}/>
            </Flex>
        </Box>
      </Box>
      <Box style={{ position: 'relative' }}>
        <Image
          src="cyd-onboard-ellipse.svg"
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            zIndex: 1, // lower z-index so it's behind
          }}
        />
        <Image
          src="onboard-image.svg"
          height={"400px"}
          style={{
            position: 'absolute',
            top: "45%",
            left: '50%',
            transform: 'translate(-45%, -50%)',
            zIndex: 2, // higher z-index so it's on top
          }}
          alignContent={"center"}
        />
      </Box>
      </Flex>
    </Box>
  );
}
