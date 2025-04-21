'use client';

import { useState } from 'react';
import { Box, Image, Flex, Text, Link, VStack, HStack } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import DatePickerInput from '@/src/components/DatePickerInput';
import DropDownInput from '@/src/components/DropDownInput';
import { User, LockKeyhole } from 'lucide-react';
import { parse, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const pronouns = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

  const [displayName, setDisplayName] = useState('');
  const [selectedPronoun, setSelectedPronoun] = useState('');
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState(false);

  const isValidDate = (dateStr: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!regex.test(dateStr)) {
      return false;
    }

    const parsedDate = parse(dateStr, 'MM/dd/yyyy', new Date());
    return isValid(parsedDate);
  };

  const formValid =
    displayName.trim() !== '' && selectedPronoun.trim() !== '' && date.trim() !== '' && isValidDate(date) && checked;

  const handleNextClick = () => {
    if (formValid) {
      router.push('/dashboard');
    }
  };

  return (
    <Box position="relative" bg="white" height="100vh" width="100vw">
      <Box position="absolute" top={0} left={0} p={6} zIndex={5}>
        <Image src="cyd-logo.svg" alt="Code Your Dreams" width="15vw" />
      </Box>

      <Flex height="100vh" width="100vw" position="relative">
        {/* Form section */}
        <VStack
          w={{ base: '100%', md: '50%' }}
          alignItems="center"
          justify="center"
          zIndex={2}
          p={6}
          bg="white"
          position="relative"
        >
          <VStack alignItems="left">
            <Text fontWeight="bold" fontSize="clamp(30px,2.7vw,100px)" color="#BC3860" fontFamily="Poppins">
              Welcome to CYD Hub!
            </Text>
            <Text width="100%" fontWeight="medium" fontSize="clamp(16px,1.25vw,50px)" color="black" mb={4}>
              Please enter information about yourself.
            </Text>
            <Text color="black" fontSize="clamp(14px,.97vw,40px)" fontWeight="medium" mb={0}>
              Display Name
              <Text as="span" color="#BC3860">
                *
              </Text>
            </Text>
            <Box w="clamp(460px,31.9vw,1000px)">
              <TextInput
                label="Input"
                icon={<User />}
                height="clamp(54px, 6.25vh, 200px)"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </Box>
            <Text color="black" fontSize="clamp(14px,.97vw,40px)" fontWeight="medium" mt={3}>
              Email
            </Text>
            <Box w="clamp(460px,31.9vw,1000px)">
              <TextInput
                label="Email"
                icon={<LockKeyhole />}
                disabled={true}
                value="RandomExample@email.com"
                height="clamp(54px, 6.25vh, 200px)"
              />
            </Box>

            <HStack gap="16px" width="clamp(460px,31.9vw,1000px)" justifyContent={'space-between'} mt={3}>
              <VStack alignItems="left" width="35%">
                <Text color="black" fontSize="clamp(14px,.97vw,40px)" fontWeight="medium">
                  Pronouns
                  <Text as="span" color="#BC3860">
                    *
                  </Text>
                </Text>
                <Box width="100%">
                  <DropDownInput
                    helperText="Pronouns"
                    options={pronouns}
                    isRequired={true}
                    height="clamp(54px, 6.25vh, 200px)"
                    value={selectedPronoun}
                    onChange={value => setSelectedPronoun(value)}
                  />
                </Box>
              </VStack>
              <VStack gap="6px" alignItems="left" w="55%">
                <Text color="black" fontSize="clamp(14px,.97vw,40px)" fontWeight="medium">
                  Date of Birth
                  <Text as="span" color="#BC3860">
                    *
                  </Text>
                </Text>
                <Box width="100%">
                  <DatePickerInput
                    helperText="XX/XX/XXXX"
                    height="clamp(54px, 6.25vh, 200px)"
                    val={date}
                    onChange={value => setDate(value)}
                  />
                </Box>
              </VStack>
            </HStack>
            <Checkbox
              size="lg"
              borderColor="gray.400"
              borderStartEndRadius={'full'}
              variant="outline"
              colorPalette="white"
              _checked={{ bg: 'white', borderColor: 'gray.400' }}
              checked={checked}
              onCheckedChange={() => setChecked(prev => !prev)}
              mt="clamp(20px, 2.5vh, 80px)"
              mb="clamp(20px, 3.5vh, 80px)"
            >
              <Flex direction="row">
                <Text color="black" fontSize="clamp(16px,1.1vw,40px)" fontWeight="medium">
                  I certify that I have read the{'\u00A0'}
                </Text>
                <Link color="#4D80BB" href="/" fontSize="clamp(16px,1.1vw,40px)" textDecoration="underline">
                  Terms of Conditions
                </Link>
              </Flex>
            </Checkbox>
            <Button
              type={!formValid ? 'disabled' : 'primary'}
              pageColor="flamingo"
              text="Next"
              height="clamp(64px,9.25vh,80px)"
              width="clamp(460px,31.9vw,1000px)"
              onClick={handleNextClick}
            />
          </VStack>
        </VStack>

        {/* Image section */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w={{ base: 0, md: '50vw' }}
          h="100%"
          display={{ base: 'none', md: 'flex' }} /* ① make this a flex box      */
          justifyContent="flex-end" /*   keep it flush right        */
          alignItems="center" /* ② vertically centre its child */
          overflow="hidden"
          pointerEvents="none"
          zIndex={1}
        >
          <Image
            src="cyd-onboard-ellipse.svg"
            alt="Onboard Ellipse"
            h="170vh" /* scaled‑up height   */
            w="auto" /* preserve aspect   */
            objectFit="contain"
            objectPosition="right" /* right‑align inside the flex item */
          />
        </Box>
      </Flex>
    </Box>
  );
}
