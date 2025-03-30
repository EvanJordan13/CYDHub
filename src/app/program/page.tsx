import Module from '@/src/components/Module';
import { Text, Heading, Box, Image, Tabs } from '@chakra-ui/react';

export default function ProgramPage() {
  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'}>
      <Box style={{ flexBasis: '15%' }}>
        <Text>Sidebar</Text>
      </Box>
      <Box marginY={6} style={{ flexBasis: '85%' }}>
        <Box display={'flex'} height={'28px'} justifyContent={'space-between'}>
          <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
            HTML Basics
          </Heading>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} />
            <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
              5
            </Text>
          </Box>
        </Box>
        <Box marginTop={5} width={'96.5%'}>
          <Tabs.Root defaultValue="modules">
            <Tabs.List>
              <Tabs.Trigger
                value="modules"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Modules</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="announcements"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Announcements</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="feedback"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Feedback</Text>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Box>
        <Module />
        <Module />
      </Box>
    </Box>
  );
}
