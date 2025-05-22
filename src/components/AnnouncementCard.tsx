import Link from 'next/link';
import { Box, Flex, Text, Heading, Image } from '@chakra-ui/react';

const formatDate = (date: Date) => {
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const time = date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
    .replace(' ', '');

  return `${month} ${day}${suffix}, ${time}`;
};

export interface AnnouncementCardProps {
  subject?: string;
  title?: string;
  message: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  link?: string;
}

export default function AnnouncementCard({
  subject,
  title,
  message,
  name,
  avatarUrl,
  createdAt,
  link,
}: AnnouncementCardProps) {
  const CardContent = () => (
    <Box
      borderRadius="md"
      bg="white"
      p={5}
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      _hover={{
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.3)',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s ease-in-out"
    >
      <Flex gap={3} mb={3} alignItems="flex-start">
        <Box flexShrink={0} width={12} height={12} borderRadius="full" overflow="hidden">
          <Image
            src={avatarUrl || '/images/default-avatar.svg'}
            alt={avatarUrl ? `${name}'s avatar` : 'Default avatar'}
            width="full"
            height="full"
            objectFit="cover"
          />
        </Box>

        <Box flex={1}>
          <Flex alignItems="center" gap={1.5} fontWeight={600} color={'Slate'}>
            <Text>{name}</Text>
            {subject && <Text>({subject})</Text>}
          </Flex>
          <Text fontSize={'xs'} color="#4B5B63" fontWeight={500}>
            {formatDate(new Date(createdAt))}
          </Text>
        </Box>
      </Flex>

      <Box color={'Slate'}>
        {title && (
          <Heading as="h2" fontSize={'2xl'} fontWeight={700} mb={5}>
            {title}
          </Heading>
        )}
        <Text fontSize={'sm'} lineHeight="relaxed">
          {message}
        </Text>
      </Box>
    </Box>
  );

  return link ? (
    <Link href={link} style={{ display: 'block' }}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
}
