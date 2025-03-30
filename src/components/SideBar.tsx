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
        height="60px"
        width="160px"
        alignItems="center"
        px="20px"
        py="16px"
        gap="16px"
        _hover={{ bg: 'LightGray' }}
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
      paddingTop={'32px'}
      paddingBottom={'32px'}
      paddingLeft={'24px'}
      paddingRight={'24px'}
      justify={'space-between'}
      height={'100vh'}
      width={'208px'}
      shadow={'2px 0px 2px #e3dbdb'}
      filter={'auto'}
      dropShadow={'10px 10px 0px rgba(0, 0, 0, 0.5)'}
      position={'fixed'}
      top={0}
      left={0}
    >
      <Flex direction={'column'} height={'456px'} gap={'20px'}>
        <Link href="/">
          <Image src="/cyd-dashboard-logo.svg" height={'44px'} width={'50px'} marginBottom={'12px'} />
        </Link>
        <Bar Icon={House} text="Home" current={page == 'Home'} link={'/'} />
        <Bar Icon={AlarmClockCheck} text="To Do" current={page == 'To Do'} link={'/'} />
        <Bar Icon={CodeXml} text="Editor" current={page == 'Editor'} link={'/'} />
        <Bar Icon={Calendar} text="Calendar" current={page == 'Calendar'} link={'/'} />
        <Bar Icon={Store} text="Shop" current={page == 'Shop'} link={'/'} />
      </Flex>
      <Flex direction={'column'} height={'220px'} gap={'20px'}>
        <Bar Icon={Archive} text="Archived" current={page == 'Archived'} link={'/'} />
        <Bar Icon={Settings} text="Settings" current={page == 'Settings'} link={'/'} />
        <Bar Icon={LogOut} text="Log Out" current={page == 'Log Out'} link={'/'} />
      </Flex>
    </Flex>
  );
}
