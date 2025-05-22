import { Image, Link, Text, Flex } from '@chakra-ui/react';
import { House, AlarmClockCheck, CodeXml, Calendar, Store, Archive, Settings, LogOut } from 'lucide-react';
import { Tab } from '@/src/components/dashboard/types';

type BarProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
};

function Bar({ Icon, text, isSelected, onClick }: BarProps) {
  return (
    <Flex
      direction="row"
      borderRadius="2xl"
      height={16}
      width={40}
      alignItems="center"
      px={5}
      py={4}
      gap={4}
      bg={isSelected ? 'Sky' : 'transparent'}
      _hover={{ bg: isSelected ? 'Sky' : 'LightGray' }}
      cursor={'pointer'}
      onClick={onClick}
      transition={'all 0.2s ease-in-out'}
    >
      <Icon color={isSelected ? 'black' : '#5A5A63'} />
      <Text color={isSelected ? 'black' : 'DarkGray'}>{text}</Text>
    </Flex>
  );
}

type SideBarProps = {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function SideBar({ currentTab, onTabChange }: SideBarProps) {
  return (
    <Flex
      direction={'column'}
      paddingY={8}
      paddingX={6}
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
        <Link href="/" _focus={{ outline: 'none' }}>
          <Image src="/cyd-dashboard-logo.svg" height={11} width={12} marginBottom={3} />
        </Link>
        <Bar Icon={House} text="Home" isSelected={currentTab === 'home'} onClick={() => onTabChange('home')} />
        <Bar
          Icon={AlarmClockCheck}
          text="To Do"
          isSelected={currentTab === 'todo'}
          onClick={() => onTabChange('todo')}
        />
        <Bar Icon={CodeXml} text="Editor" isSelected={currentTab === 'editor'} onClick={() => onTabChange('editor')} />
        <Bar
          Icon={Calendar}
          text="Calendar"
          isSelected={currentTab === 'calendar'}
          onClick={() => onTabChange('calendar')}
        />
        <Bar Icon={Store} text="Shop" isSelected={currentTab === 'shop'} onClick={() => onTabChange('shop')} />
      </Flex>
      <Flex direction={'column'} height={56} gap={5}>
        <Bar
          Icon={Archive}
          text="Archived"
          isSelected={currentTab === 'archived'}
          onClick={() => onTabChange('archived')}
        />
        <Bar
          Icon={Settings}
          text="Settings"
          isSelected={currentTab === 'settings'}
          onClick={() => onTabChange('settings')}
        />
        <Link href="/api/auth/logout?returnTo=/">
          <Bar Icon={LogOut} text="Log Out" onClick={() => {}} />
        </Link>
      </Flex>
    </Flex>
  );
}
