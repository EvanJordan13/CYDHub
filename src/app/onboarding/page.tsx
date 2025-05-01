'use client';

import { useState } from 'react';
import { Box, Image, Flex, Text, Link, Center, Spinner } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import DatePickerInput from '@/src/components/DatePickerInput';
import DropDownInput from '@/src/components/DropDownInput';
import { User, LockKeyhole } from 'lucide-react';
import { parse, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const [dbUserId, setDbUserId] = useState<number | null>(null);

  useEffect(() => {
    if (dbUser && !dbUser.name && auth0User?.name) {
      setDisplayName(auth0User.name);
    } else if (dbUser?.name) {
      setDisplayName(dbUser.name);
    }
    if (dbUser?.pronouns) setSelectedPronoun(dbUser.pronouns);
    if (dbUser?.birthdate) setDate(dbUser.birthdate);
  }, [dbUser, auth0User]);

  useEffect(() => {
    if (!isLoading && !auth0User?.user && !error) {
      router.push('/api/auth/login');
    } else if (!isLoading && dbUser?.signupComplete) {
      toaster.info({
        title: 'Already Onboarded',
        description: 'Redirecting you to the dashboard...',
        duration: 2000,
        closable: true,
      });
      setTimeout(() => router.push('/dashboard'), 1500);
    } else if (!isLoading && error) {
      console.error('Onboarding: Error loading session:', error);
      toaster.error({
        title: 'Error Loading Profile',
        description: error.message || 'Could not load user data. Please try logging in again.',
        duration: 5000,
        closable: true,
      });
      setTimeout(() => router.push('/api/auth/login'), 5000);
    }
  }, [dbUser, auth0User, isLoading, error, router]);
  const isValidDate = (dateStr: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!regex.test(dateStr)) {
      return false;
    }

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
    if (isSubmitting || !dbUser || isLoading) {
      if (!dbUser || isLoading) {
        toaster.warning({
          title: 'Loading...',
          description: 'User data is still loading. Please wait.',
          duration: 3000,
          closable: true,
        });
      }
      return;
    }

    if (displayName.trim() === '') {
      toaster.warning({ title: 'Display Name is required.', duration: 3000, closable: true });
      return;
    }
    if (selectedPronoun.trim() === '') {
      toaster.warning({ title: 'Pronouns are required.', duration: 3000, closable: true });
      return;
    }
    if (date.trim() === '' || !isValidDate(date)) {
      toaster.warning({ title: 'A valid Date of Birth (MM/DD/YYYY) is required.', duration: 3000, closable: true });
      return;
    }
    if (!checked) {
      toaster.warning({ title: 'You must accept the Terms of Conditions.', duration: 3000, closable: true });
      return;
    }

    setIsSubmitting(true);
    toaster.loading({ title: 'Saving Profile...', id: 'onboarding-save' });

    try {
      const response = await fetch(`/api/users/${dbUserId}`, {
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
        } catch (parseError) {
          console.warn('Could not parse error response body:', parseError);
        }
        throw new Error(errorDetails);
      }

      refetch();

      toaster.success({
        title: 'Profile Complete!',
        description: 'Your profile has been set up successfully. Redirecting...',
        duration: 4000,
        closable: true,
        id: 'onboarding-save',
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving user data:', error);
      toaster.error({
        title: 'Error Saving Profile',
        description: error instanceof Error ? error.message : 'An unknown error occurred. Please try again.',
        duration: 6000,
        closable: true,
        id: 'onboarding-save',
      });
    }
  };

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

  if (!auth0User?.user || dbUser?.signupComplete) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="Aqua" />
      </Center>
    );
  }

  return dbUser && auth0User?.user ? (
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
                  borderStartEndRadius={'full'}
                  variant="outline"
                  colorPalette="white"
                  _checked={{ bg: 'white', borderColor: 'gray.400' }}
                  checked={checked}
                  onCheckedChange={() => setChecked(prev => !prev)}
                >
                  <Flex direction="row">
                    <Text color="black" fontSize="xl" fontWeight="medium">
                      I certify that I have read the{'\u00A0'}
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
  ) : (
    <Center h="100vh">
      <Spinner size="xl" color="Aqua" />
    </Center>
  );
}
