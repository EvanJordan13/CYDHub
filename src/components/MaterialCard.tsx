import { Box, Text, Link, Flex } from '@chakra-ui/react';
import { File, Video, BadgeCheck } from 'lucide-react';

interface MaterialCardProps {
  name: string | null;
  url: string | null;
  type: string;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

export default function MaterialCard({ name, url, type, clicked, setClicked }: MaterialCardProps) {
  const handleClick = () => {
    setClicked(true); // Set clicked state to true
  };

  return (
    <Link
      href={url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      width={'100%'}
      onClick={handleClick}
      _hover={{
        textDecoration: 'none',
        outline: 'none',
      }}
      _focus={{ outline: 'none' }}
    >
      <Box
        width={'100%'}
        bg={'white'}
        shadow={'md'}
        rounded={'lg'}
        py={9}
        px={6}
        borderColor={clicked ? 'Aqua' : ''}
        borderWidth={clicked ? '0.1rem' : ''}
        _hover={{ bg: '#F0F0F0' }}
      >
        <Flex direction={'row'} gap={4} align="center">
          {type === 'VIDEO' ? <Video /> : <File />}
          <Text fontWeight={'semibold'} color={'black'}>
            {name}
          </Text>

          <Box ml="auto">{clicked && <BadgeCheck stroke="white" fill="#4D80BB" />}</Box>
        </Flex>
      </Box>
    </Link>
  );
}
