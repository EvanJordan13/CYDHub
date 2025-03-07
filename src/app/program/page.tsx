import { Text, Heading, Box } from '@chakra-ui/react';

export default function ProgramPage() {
  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'} style={{ height: '100vh' }}>
      <Box style={{ flexBasis: '15%' }}>
        <Text>Sidebar</Text>
      </Box>
      <Box>
        <Heading fontSize={35} color={'Aqua'} marginTop={6}>
          HTML Basics
        </Heading>
      </Box>
    </Box>
  );
}
