import { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { Assignment } from '@prisma/client';
import { Collapsible, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronDown, ClipboardMinus } from 'lucide-react';

interface TodoDropdownProps {
  title: string;
  assignments: Assignment[];
}

const displayDueDate = (dueDate: Date | null) => {
  if (!dueDate) return 'No due date';

  const dueTime = dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  let dueDay = dueDate.toLocaleDateString();

  // Due day logic
  const today = new Date();
  const diffTime = Math.abs(dueDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) dueDay = 'today';
  if (diffDays === 1) dueDay = 'tomorrow';

  // Return final display
  return `Due ${dueDay} @ ${dueTime}`;
};

export default function TodoDropdown({ title, assignments }: TodoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = assignments.length === 0;

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={details => setIsOpen(details.open)}
      style={{ width: '100%', overflow: 'visible' }}
    >
      <Collapsible.Trigger style={{ width: '100%', marginBottom: '16px' }}>
        <Flex
          color={'white'}
          bg={isEmpty ? '#C1C1C1' : 'Aqua'}
          borderRadius={'8px'}
          p={'24px 32px'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          alignSelf={'stretch'}
          width={'100%'}
          cursor={isEmpty ? 'not-allowed' : 'pointer'}
          _hover={{
            bg: isEmpty ? '#C1C1C1' : 'AquaHover',
          }}
        >
          <Heading>
            {title} ({assignments.length})
          </Heading>
          <IconButton
            disabled={isEmpty}
            variant="plain"
            colorScheme="whiteAlpha"
            aria-label="Toggle Todo Section"
            color={'white'}
          >
            <ChevronDown
              style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform 0.3s ease-in-out' }}
            />
          </IconButton>
        </Flex>
      </Collapsible.Trigger>
      <Collapsible.Content style={{ overflow: 'visible', width: '100%' }}>
        <Flex flexDirection={'column'} gap={'16px'} width={'100%'}>
          {assignments.map(assignment => (
            <Flex
              key={assignment.id}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              padding={'24px'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}
              transform={'translateY(0)'}
              transition={'transform 0.3s ease-in-out'}
              width={'100%'}
              position={'relative'}
              zIndex={1}
              _hover={{
                transform: 'translateY(-2px)',
              }}
            >
              <Flex flexDirection={'row'} gap={'16px'} alignItems={'center'}>
                <ClipboardMinus width={24} height={24} />
                <Flex flexDirection={'column'}>
                  <Heading fontSize={'18px'} fontWeight={600}>
                    {assignment.title}
                  </Heading>
                  <Text fontSize={'16px'} fontWeight={500}>
                    {assignment.description}
                  </Text>
                </Flex>
              </Flex>
              <Flex fontSize={'14px'} fontWeight={600} padding={'8px 16px'} bg={'Sky'} borderRadius={'8px'}>
                {displayDueDate(assignment?.dueDate)}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
