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
      height="60px"
      width="160px"
      alignItems="center"
      px="20px"
      py="16px"
      gap="16px"
      bg={isSelected ? 'Sky' : 'transparent'}
      _hover={{ bg: isSelected ? 'Sky' : 'LightGray' }}
      cursor={'pointer'}
      onClick={onClick}
      transition="background-color 0.08s ease-out"
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
      paddingTop={'24px'}
      paddingBottom={'24px'}
      paddingLeft={'24px'}
      paddingRight={'24px'}
      justify={'space-between'}
      height={'100vh'}
      width={'208px'}
      shadow={'2px 0px 2px #e3dbdb'}
      filter={'auto'}
      fontSize={'16px'}
    >
      <Flex direction={'column'} gap={'4px'}>
        <Link href="/" _focus={{ outline: 'none' }}>
          <Image src="/cyd-dashboard-logo.svg" alt="logo" height={'44px'} width={'50px'} marginBottom={'8px'} />
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
      <Flex direction={'column'} gap={'4px'}>
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
        <Bar Icon={LogOut} text="Log Out" onClick={() => {}} />
      </Flex>
    </Flex>
  );
}
