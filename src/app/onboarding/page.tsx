'use client';

import { useState, useEffect } from 'react';
import { Box, Image, Flex, Text, Link, Center, Spinner } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import DatePickerInput from '@/src/components/DatePickerInput';
import DropDownInput from '@/src/components/DropDownInput';
import { User, LockKeyhole } from 'lucide-react';
import { parse, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toaster } from '../../components/ui/toaster';
import { useDbSession } from '@/src/hooks/useDbSession';

export default function OnboardingPage() {
  const { dbUser, auth0User, isLoading, error, refetch } = useDbSession();
  const router = useRouter();
  const pronouns = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

  const [displayName, setDisplayName] = useState('');
  const [selectedPronoun, setSelectedPronoun] = useState('');
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dbUser?.pronouns) setSelectedPronoun(dbUser.pronouns);
    if (dbUser?.birthdate) setDate(dbUser.birthdate);
  }, [dbUser, auth0User]);

  useEffect(() => {
    const shouldRedirect = !isLoading && !auth0User && !dbUser && !error;
    if (shouldRedirect) {
      window.location.href = '/api/auth/login';
    }
  }, [auth0User, dbUser, isLoading, error]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="Aqua" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error: {error.message}</Text>
      </Center>
    );
  }

  if (!auth0User || !dbUser) {
    return (
      <Center h="100vh">
        <Text>Loading user session...</Text>
      </Center>
    );
  }

  if (dbUser.signupComplete) {
    window.location.href = '/dashboard';
    return null;
  }

  const isValidDate = (dateStr: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
    const parsedDate = parse(dateStr, 'MM/dd/yyyy', new Date());
    return isValid(parsedDate);
  };

  const formValid =
    displayName.trim() !== '' &&
    selectedPronoun.trim() !== '' &&
    pronouns.includes(selectedPronoun) &&
    date.trim() !== '' &&
    isValidDate(date) &&
    checked;

  const handleNextClick = async () => {
    if (isSubmitting || !dbUser || isLoading) return;

    if (!formValid) {
      toaster.warning({
        title: 'Please fill out all required fields correctly.',
        duration: 3000,
        closable: true,
      });
      return;
    }

    setIsSubmitting(true);
    toaster.loading({ title: 'Saving Profile...', id: 'onboarding-save' });

    try {
      const response = await fetch(`/api/users/${dbUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayName.trim(),
          pronouns: selectedPronoun,
          birthdate: date,
          signupComplete: true,
        }),
      });

      if (!response.ok) {
        let errorDetails = `Request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData.message || JSON.stringify(errorData) || errorDetails;
        } catch {}
        throw new Error(errorDetails);
      }

      refetch();
      toaster.success({
        title: 'Profile Complete!',
        description: 'Redirecting to dashboard...',
        duration: 4000,
        closable: true,
        id: 'onboarding-save',
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      toaster.error({
        title: 'Error Saving Profile',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        duration: 6000,
        closable: true,
        id: 'onboarding-save',
      });
    }
  };

  return (
    <Box bg="white" height="100vh" width="100vw">
      <Flex direction="row" justify="space-between" height="100%">
        <Box marginTop="2%" marginLeft="2%" padding="1%" width="50%">
          <Image src="cyd-logo.svg" alt="Code Your Dreams" width="40%" />
          <Box marginTop="15%" marginLeft="20%">
            <Flex direction="column">
              <Box marginBottom="4%" width="100%">
                <Text fontWeight="bold" fontSize="310%" color="#BC3860" fontFamily="Poppins">
                  Welcome to CYD Hub!
                </Text>
                <Text width="100%" fontWeight="medium" fontSize="140%" color="black">
                  Please enter information about yourself.
                </Text>
              </Box>
              <Flex direction="column" gap={5} width="78%" marginBottom={8}>
                <Box>
                  <Text color="black" fontSize="113%" fontWeight="medium" mb={2}>
                    Display Name
                    <Text as="span" color="#BC3860">
                      *
                    </Text>
                  </Text>
                  <TextInput
                    label="Input"
                    icon={<User />}
                    height={20}
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                  />
                </Box>
                <Box>
                  <Text color="black" fontSize="113%" fontWeight="medium" mb={2}>
                    Email
                  </Text>
                  <TextInput
                    label="Email"
                    icon={<LockKeyhole />}
                    disabled={true}
                    value={auth0User.email!}
                    height={20}
                  />
                </Box>
                <Flex direction="row" gap="16px" width="100%">
                  <Flex direction="column" gap="6px" width="35%" height="100%">
                    <Box width="100%">
                      <DropDownInput
                        labelText="Pronouns"
                        helperText="Pronouns"
                        options={pronouns}
                        isRequired={true}
                        height={20}
                        value={selectedPronoun}
                        onChange={value => setSelectedPronoun(value)}
                      />
                    </Box>
                  </Flex>
                  <Flex direction="column" gap="6px">
                    <Text color="black" fontSize="113%" fontWeight="medium">
                      Date of Birth
                      <Text as="span" color="#BC3860">
                        *
                      </Text>
                    </Text>
                    <Box width="142%">
                      <DatePickerInput
                        helperText="XX/XX/XXXX"
                        height={20}
                        val={date}
                        onChange={value => setDate(value)}
                        isRequired={true}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="row" marginBottom={10}>
                <Checkbox
                  id="terms-checkbox"
                  size="lg"
                  borderColor="gray.400"
                  variant="outline"
                  colorPalette="white"
                  _checked={{ bg: 'white', borderColor: 'gray.400' }}
                  checked={checked}
                  onCheckedChange={() => setChecked(prev => !prev)}
                >
                  <Flex direction="row">
                    <Text color="black" fontSize="xl" fontWeight="medium" mr={'4px'}>
                      I certify that I have read the{' '}
                    </Text>
                    <Link color="#4D80BB" href="/" fontSize="xl" textDecoration="underline">
                      Terms of Conditions
                    </Link>
                  </Flex>
                </Checkbox>
              </Flex>
              <Button
                type={!formValid ? 'disabled' : 'primary'}
                pageColor="flamingo"
                text="Next"
                textSize="16px"
                height="70px"
                width="79%"
                onClick={handleNextClick}
              />
            </Flex>
          </Box>
        </Box>
        <Box width="50%" height="100%" position="relative" overflow="hidden">
          <Image
            src="cyd-onboard-ellipse.svg"
            alt="Onboard Ellipse"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            zIndex={1}
          />
        </Box>
      </Flex>
    </Box>
  );
}
