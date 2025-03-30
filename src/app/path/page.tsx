'use client';

import { useState } from 'react';
import { Box, Image, Flex, Text, Link } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import DatePickerInput from '@/src/components/DatePickerInput';
import DropDownInput from '@/src/components/DropDownInput';
import { User, LockKeyhole } from 'lucide-react';
import { parse, isValid } from 'date-fns';

export default function OnboardingPage() {
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
                    value="RandomExample@email.com"
                    height={20}
                  />
                </Box>
                <Flex direction="row" gap="16px" width="100%">
                  <Flex direction="column" gap="6px" width="35%" height="100%">
                    <Box width="100%">
                      <DropDownInput
                        labelText="Select Pronouns"
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
                      Date
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
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="row" marginBottom={10}>
                <Checkbox
                  size="lg"
                  borderColor="gray.400"
                  variant="subtle"
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
