'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { User } from '@prisma/client';
import TextInput from '@/src/components/TextInput';
import DropDownInput from '@/src/components/DropDownInput';
import ConfirmChangesModal from '@/src/components/dashboard/ConfirmChangesModal';
import { User as UserIcon, Mail } from 'lucide-react';
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

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setPronouns(userInfo.pronouns && pronounOptions.includes(userInfo.pronouns) ? userInfo.pronouns : '');
    }
  }, [userInfo]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && userInfo) {
      // If exiting edit mode without saving (isEditing was true, now false)
      setName(userInfo.name || '');
      setPronouns(userInfo.pronouns && pronounOptions.includes(userInfo.pronouns) ? userInfo.pronouns : '');
    }
  };

  const handleCancelChanges = () => {
    if (userInfo) {
      setName(userInfo.name || '');
      setPronouns(userInfo.pronouns && pronounOptions.includes(userInfo.pronouns) ? userInfo.pronouns : '');
    }
    setIsEditing(false);
  };

  const handleOpenConfirmChangesModal = () => {
    setIsConfirmChangesModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setIsConfirmChangesModalOpen(false);
    setIsEditing(false);
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

      if (!domain || !clientId) {
        console.error('Missing Auth0 configuration:', { domain, clientId });
        setResetPasswordMessage('Configuration error. Please contact support.');
        return;
      }

      const url = `https://${domain}/dbconnections/change_password`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          email: userInfo?.email || '',
          connection: 'Username-Password-Authentication',
        }),
      });
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Text color="black" fontSize="18px" fontWeight="medium" mb={2}>
              Email
            </Text>
            <TextInput label="Email" icon={<Mail />} disabled={true} value={userInfo?.email || ''} height={20} />
          </Box>
          <Flex direction="column" gap="6px" width="100%">
            {' '}
            {/* Changed width to 100% for DropDownInput */}
            <Box width="100%" mb={6}>
              {' '}
              {/* Ensured DropDownInput takes full width of its parent */}
              <DropDownInput
                labelText="Pronouns"
                size="18px"
                helperText="Pronouns"
                options={pronounOptions}
                isRequired={true}
                disabled={!isEditing}
                value={pronouns}
                onChange={value => setPronouns(value)}
              />
            </Box>
          </Flex>
          <AnimatedLink
            link="#"
            linkName="Send Password Reset Email"
            underlineColor="Aqua"
            onClick={e => {
              e.preventDefault();
              handlePasswordReset();
            }}
          />
          {resetPasswordMessage && (
            <Text color={resetPasswordMessage.includes('successfully') ? 'green.500' : 'red.500'} mt={2}>
              {resetPasswordMessage}
            </Text>
          )}
          {isEditing ? (
            <Flex flexDirection={'row'} justifyContent={'space-between'} mt="auto">
              {' '}
              {/* Added mt="auto" to push to bottom */}
              <Button
                onClick={handleCancelChanges}
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="Slate"
                h="48px"
                p="12px 24px"
                borderRadius="8px"
                borderWidth="1px"
                borderColor="gray.300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleOpenConfirmChangesModal}
                fontSize="16px"
                fontWeight={500}
                bg="Aqua"
                color="white"
                _hover={{ bg: 'AquaHover' }}
                h="48px"
                p="12px 24px"
                borderRadius="8px"
              >
                Save Changes
              </Button>
            </Flex>
          ) : (
            <Flex justifyContent="flex-end" mt="auto">
              {' '}
              {/* Added mt="auto" and Flex for alignment */}
              <Button
                onClick={handleToggleEdit}
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="Slate"
                h="48px"
                p="12px 24px"
                borderRadius="8px"
                boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
              >
                Edit
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
