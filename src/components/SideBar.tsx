import { Box, Image, Link, Text, Flex } from '@chakra-ui/react';
import { House, AlarmClockCheck, CodeXml, Calendar, Store, Archive, Settings, LogOut } from 'lucide-react';

type BarProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  current: boolean;
  link: string;
};

function Bar({ Icon, text, current, link }: BarProps) {
  return (
    <Link href={link}>
      <Flex
        direction="row"
        borderRadius="2xl"
        height={16}
        width={40}
        alignItems="center"
        px={5}
        py={4}
        gap={4}
        _hover={{ bg: 'LightGray', transform: 'translateY(-2px)' }}
        transition={'all 0.2s ease-in-out'}
        bg={current ? 'Sky' : ''}
      >
        <Icon color={current ? 'black' : '#5A5A63'} />
        <Text color={current ? 'black' : 'DarkGray'}>{text}</Text>
      </Flex>
    </Link>
  );
}

type SideBarProps = {
  page: string;
};

export default function SideBar({ page }: SideBarProps) {
  return (
    <Flex
      direction={'column'}
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={6}
      paddingRight={6}
      justify={'space-between'}
      height={'100vh'}
      width={52}
      shadow={'2px 0px 2px #e3dbdb'}
      filter={'auto'}
      dropShadow={'10px 10px 0px rgba(0, 0, 0, 0.5)'}
      position={'fixed'}
      top={0}
      left={0}
    >
      <Flex direction={'column'} height={'100vh'} gap={3}>
        <Link href="/">
          <Image src="/cyd-dashboard-logo.svg" height={11} width={12} marginBottom={3} />
        </Link>
        <Bar Icon={House} text="Home" current={page == 'Home'} link={'/dashboard'} />
        <Bar Icon={AlarmClockCheck} text="To Do" current={page == 'To Do'} link={'/dashboard'} />
        <Bar Icon={CodeXml} text="Editor" current={page == 'Editor'} link={'/dashboard'} />
        <Bar Icon={Calendar} text="Calendar" current={page == 'Calendar'} link={'/dashboard'} />
        <Bar Icon={Store} text="Shop" current={page == 'Shop'} link={'/dashboard'} />
      </Flex>
      <Flex direction={'column'} height={56} gap={5}>
        <Bar Icon={Archive} text="Archived" current={page == 'Archived'} link={'/dashboard'} />
        <Bar Icon={Settings} text="Settings" current={page == 'Settings'} link={'/dashboard'} />
        <Bar Icon={LogOut} text="Log Out" current={page == 'Log Out'} link={'/dashboard'} />
      </Flex>
    </Flex>
  );
}
