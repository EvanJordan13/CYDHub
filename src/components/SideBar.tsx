import { Box, Image, Link, Text, Flex } from '@chakra-ui/react';
import Home from '../app/page';
import { House, AlarmClockCheck, CodeXml, Calendar, Store, Archive, Settings, LogOut } from 'lucide-react';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

type BarProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  txt: string;
  hover: boolean;
};

function Bar({ Icon, txt, hover }: BarProps) {
  return (
    <Flex
      direction="row"
      borderRadius="2xl"
      height="60px"
      alignItems="center"
      px="20px"
      py="16px"
      gap="16px"
      bg={hover ? '#F0EFEF' : ''}
    >
      <Icon color={hover ? 'black' : '#5A5A63'} />
      <Text color={hover ? 'black' : '#5A5A63'}>{txt}</Text>
    </Flex>
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
      // dropShadow={"sm"}
      // boxShadow={'sm'}
      shadow={'2px 2px 2px #e3dbdb'}
    >
      <Flex direction={'column'} height={'456px'} gap={'20px'}>
        <Image src="cyd-dashboard-logo.svg" height={'44px'} width={'50px'} marginBottom={'12px'} />
        <Bar Icon={House} txt="Home" hover={page == 'Home'} />
        <Bar Icon={AlarmClockCheck} txt="To Do" hover={page == 'To Do'} />
        <Bar Icon={CodeXml} txt="Editor" hover={page == 'Editor'} />
        <Bar Icon={Calendar} txt="Calendar" hover={page == 'Calendar'} />
        <Bar Icon={Store} txt="Shop" hover={page == 'Shop'} />
      </Flex>
      <Flex direction={'column'} height={'220px'} gap={'20px'}>
        <Bar Icon={Archive} txt="Archived" hover={page == 'Archived'} />
        <Bar Icon={Settings} txt="Settings" hover={page == 'Settings'} />
        <Bar Icon={LogOut} txt="Log Out" hover={page == 'Log Out'} />
      </Flex>
    </Flex>
  );
}
