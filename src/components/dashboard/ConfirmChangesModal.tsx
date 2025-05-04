import { Flex, Text } from '@chakra-ui/react';
import Button from '@/src/components/Button';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { updateUser } from '@/src/lib/query/users';

type Change = {
  field: string;
  oldValue: string;
  newValue: string;
};

interface ConfirmChangesModalProps {
  changes: Change[];
  isOpen?: boolean;
  onClose?: () => void;
  userId: number;
  onSave?: () => void;
}

const MotionFlex = motion(Flex);
const MotionDiv = motion.div;

export default function ConfirmChangesModal({
  changes,
  isOpen = false,
  onClose,
  userId,
  onSave,
}: ConfirmChangesModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Extract the changes into an object format
      const updateData: { name?: string; pronouns?: string } = {};
      changes.forEach(change => {
        if (change.field === 'Display Name') {
          updateData.name = change.newValue;
        } else if (change.field === 'Pronouns') {
          updateData.pronouns = change.newValue;
        }
      });

      // Update the user
      await updateUser(userId, updateData);

      // Call the onSave callback if provided
      onSave?.();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {isOpen && (
        <MotionFlex
          position={'fixed'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          width={'100vw'}
          height={'100vh'}
          bg={'rgba(0, 0, 0, 0.20)'}
          zIndex={'5'}
          justifyContent={'center'}
          alignItems={'center'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <MotionFlex
            flexDirection={'column'}
            gap={'32px'}
            bg={'white'}
            p={'32px 48px'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
            alignItems={'center'}
            overflow={'hidden'}
            position={'relative'}
            transformOrigin={'center center'}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{
              scaleY: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 },
            }}
          >
            <Text fontSize={'28px'} fontWeight={'700'}>
              Confirm Changes
            </Text>
            {error && (
              <Text color="red.500" fontSize="14px">
                {error}
              </Text>
            )}
            <Flex flexDirection={'column'} gap={'24px'} alignItems={'center'}>
              {changes.map(change => (
                <Flex
                  flexDirection={'row'}
                  gap={'20px'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  key={change.field}
                >
                  <Flex flexDirection={'column'} gap={'4px'} flex={1}>
                    <Text fontSize={'16px'} fontWeight={'500'}>
                      Current {change.field}:
                    </Text>
                    <Text fontSize={'18px'} fontWeight={'600'} color={'DarkGray'}>
                      {change.oldValue}
                    </Text>
                  </Flex>
                  <Flex flexShrink={0} alignItems={'center'}>
                    <MotionDiv
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ArrowRight width={'24px'} height={'24px'} />
                    </MotionDiv>
                  </Flex>
                  <Flex flexDirection={'column'} gap={'4px'} flex={1}>
                    <Text fontSize={'16px'} fontWeight={'500'}>
                      New {change.field}:
                    </Text>
                    <Text fontSize={'18px'} fontWeight={'600'} color={'Aqua'}>
                      {change.newValue}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Flex width={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
              <Button
                onClick={handleClose}
                type={'secondary'}
                pageColor={'aqua'}
                text={'Go Back'}
                height={''}
                width={''}
              />
              <Button
                onClick={handleSave}
                type={isSaving ? 'disabled' : 'primary'}
                pageColor={'aqua'}
                text={isSaving ? 'Saving Changes...' : 'Confirm Change'}
                height={''}
                width={''}
              />
            </Flex>
          </MotionFlex>
        </MotionFlex>
      )}
    </AnimatePresence>,
    document.body,
  );
}
