'use client';

import { useState } from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { User } from '@prisma/client';
import TextInput from '@/src/components/TextInput';
import DropDownInput from '@/src/components/DropDownInput';
import ConfirmChangesModal from '@/src/components/dashboard/ConfirmChangesModal';
import { User as UserIcon, Mail, Lock, Link } from 'lucide-react';
import AnimatedLink from '../../AnimatedLink';

interface SettingsSectionProps {
  userInfo: User | null;
  onUserUpdate?: (updatedUser: User) => void;
}

const pronounOptions = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

export default function SettingsSection({ userInfo, onUserUpdate }: SettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmChangesModalOpen, setIsConfirmChangesModalOpen] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string | null>(null);

  const [name, setName] = useState(userInfo?.name || '');
  const [pronouns, setPronouns] = useState(
    userInfo?.pronouns && pronounOptions.includes(userInfo.pronouns) ? userInfo.pronouns : '',
  );

  const getPasswordResetLink = (email: string) => {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
    const connection = 'Username-Password-Authentication'; // must match your dashboard exactly

    return `${domain}/dbconnections/change_password?client_id=${clientId}&email=${encodeURIComponent(email)}&connection=${encodeURIComponent(connection)}`;
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelChanges = () => {
    setName(userInfo?.name || '');
    setPronouns(userInfo?.pronouns || '');
    setIsEditing(false);
  };

  const handleOpenConfirmChangesModal = () => {
    setIsConfirmChangesModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setIsConfirmChangesModalOpen(false);
    setIsEditing(false);
    // Update local state with new values
    if (userInfo) {
      const updatedUser = {
        ...userInfo,
        name: name,
        pronouns: pronouns,
      };
      onUserUpdate?.(updatedUser);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

      console.log('Auth0 Domain:', domain);
      console.log('Auth0 Client ID:', clientId);
      console.log('User Email:', userInfo?.email);

      if (!domain || !clientId) {
        console.error('Missing Auth0 configuration:', { domain, clientId });
        setResetPasswordMessage('Configuration error. Please contact support.');
        return;
      }

      const url = `https://${domain}/dbconnections/change_password`;
      console.log('Request URL:', url);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          email: userInfo?.email || '',
          connection: 'Username-Password-Authentication',
        }),
      });

      console.log('Response status:', res.status);
      const text = await res.text();
      console.log('Response text:', text);

      if (res.ok) {
        setResetPasswordMessage('Password reset email sent successfully!');
      } else {
        setResetPasswordMessage('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setResetPasswordMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Box width={'100%'}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        p={'32px 48px 24px 48px'}
        boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
      >
        <Heading fontSize={'40px'} fontWeight={700} lineHeight={'normal'}>
          Welcome, {userInfo?.name || ''}
        </Heading>
        <Flex flexDirection={'row'} gap={'8px'} alignItems={'center'}>
          <Image src="/streak-card-icon.svg" alt="streak" width={19} height={28} />
          <Text fontSize={'32px'} fontWeight={700} lineHeight={'normal'} color={'#FFCE29'}>
            {userInfo?.points || 0}
          </Text>
        </Flex>
      </Flex>
      <Box pt={'32px'} px={'48px'}>
        <Heading fontSize={'32px'} fontWeight={700} lineHeight={'normal'}>
          Settings
        </Heading>
        <Text fontSize={'16px'} fontWeight={500} mb={'32px'}>
          Feel free to edit any of the following
        </Text>
        <ConfirmChangesModal
          changes={[
            {
              field: 'Display Name',
              oldValue: userInfo?.name || '',
              newValue: name,
            },
            {
              field: 'Pronouns',
              oldValue: userInfo?.pronouns || '',
              newValue: pronouns,
            },
            {
              field: 'Email',
              oldValue: userInfo?.email || '',
              newValue: userInfo?.email || '',
            },
          ]}
          isOpen={isConfirmChangesModalOpen}
          onClose={() => setIsConfirmChangesModalOpen(false)}
          userId={userInfo?.id || 0}
          onSave={handleSaveChanges}
        />
        <Flex
          bg={'white'}
          boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
          flexDirection={'column'}
          gap={'32px'}
          p={'24px 32px'}
          borderRadius={'10px'}
          w="524px"
          h="620px"
        >
          <Box>
            <Text color="black" fontSize="18px" fontWeight="medium" mb={2}>
              Display Name
            </Text>
            <TextInput
              label="Input"
              icon={<UserIcon />}
              disabled={!isEditing}
              value={userInfo?.name || ''}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Text color="black" fontSize="18px" fontWeight="medium" mb={2}>
              Email
            </Text>
            <TextInput label="Email" icon={<Mail />} disabled={!isEditing} value={userInfo?.email || ''} height={20} />
          </Box>
          <Flex direction="column" gap="6px" width="35%">
            <Box width="100%" mb={6}>
              <DropDownInput
                labelText="Pronouns"
                size="18px"
                helperText="Pronouns"
                options={pronounOptions}
                isRequired={true}
                disabled={!isEditing}
                value={userInfo?.pronouns}
                onChange={value => setPronouns(value)}
              />
            </Box>
          </Flex>
          {/* <AnimatedLink
            link="#"
            linkName="Send Password Reset Email"
            underlineColor="Aqua"
            onClick={handlePasswordReset}
          >
            Send Password Reset Email
          </AnimatedLink> */}
          {resetPasswordMessage && (
            <Text color={resetPasswordMessage.includes('successfully') ? 'green.500' : 'red.500'} mt={2}>
              {resetPasswordMessage}
            </Text>
          )}
          {isEditing ? (
            <Flex flexDirection={'row'} justifyContent={'space-between'}>
              <Button
                onClick={handleCancelChanges}
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="Slate"
                h="48px"
                p="12px 24px"
                borderRadius="8px"
              >
                Cancel
              </Button>
              <Button
                onClick={handleOpenConfirmChangesModal}
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="Slate"
                h="48px"
                p="12px 24px"
                borderRadius="8px"
                boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
              >
                Save Changes
              </Button>
            </Flex>
          ) : (
            <Button
              onClick={handleToggleEdit}
              fontSize="16px"
              fontWeight={500}
              bg="white"
              color="Slate"
              h="48px"
              p="12px 24px"
              ml="auto"
              borderRadius="8px"
              boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
            >
              Edit
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
