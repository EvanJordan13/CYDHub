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
import { getPasswordResetLink } from '@/src/lib/actions/auth';

interface SettingsSectionProps {
  userInfo: User | null;
  onUserUpdate?: (updatedUser: User) => void;
}

const pronounOptions = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

export default function SettingsSection({ userInfo, onUserUpdate }: SettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmChangesModalOpen, setIsConfirmChangesModalOpen] = useState(false);
  const [resetPasswordLink, setResetPasswordLink] = useState<string>('');

  const [name, setName] = useState(userInfo?.name || '');
  const [pronouns, setPronouns] = useState(
    userInfo?.pronouns && pronounOptions.includes(userInfo.pronouns) ? userInfo.pronouns : '',
  );

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
    const link = await getPasswordResetLink(userInfo?.email || '');
    setResetPasswordLink(link);
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
            <TextInput label="Email" icon={<Mail />} disabled={!isEditing} value={userInfo?.email || ''} height={20} />
          </Box>
          <Flex direction="column" gap="6px" width="35%">
            <Box width="100%">
              <DropDownInput
                labelText="Pronouns"
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
            link={resetPasswordLink}
            linkName="Forgot your password?"
            underlineColor="Aqua"
            onClick={handlePasswordReset}
            target="_blank"
          >
            Forgot your password?
          </AnimatedLink>
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
