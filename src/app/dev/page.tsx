import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import { Box, Heading, Flex, VStack } from '@chakra-ui/react';
import { Program } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import Button from '@/src/components/Button';
import AnnouncementCard, { AnnouncementCardProps } from '@/src/components/AnnouncementCard';

export default function DevPage() {
  // Mock course data
  const mockProgram: Program = {
    id: 1,
    name: 'Introduction to Data Science',
    description: 'A beginner-friendly course covering the fundamentals of Data Science.',
    syllabus: 'Week 1: Introduction to Python\nWeek 2: Data Wrangling\nWeek 3: Machine Learning Basics',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
    type: 'IN_PERSON',
    teacherId: null,
  };

  const mockAnnouncements: AnnouncementCardProps[] = [
    {
      subject: 'Portfolio Graded',
      title: 'HTML Portfolio Graded',
      message: 'Your HTML Portfolio assignment has been graded.',
      name: 'Penguin Pants',
      avatarUrl: 'https://i.pinimg.com/736x/f3/d5/15/f3d515f1d9105545a5954fac24f27a06.jpg',
      createdAt: new Date('2025-01-25 06:56:14.46'),
      link: '/programs/1/announcements/1',
    },
    {
      subject: 'Course Update',
      title: 'New Module Posted',
      message: 'New module "CSS Fundamentals" has been released.',
      name: 'Jane Smith',
      createdAt: new Date('2025-01-14 06:56:14.46'),
      link: '/modules/2',
    },
  ];

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>

      {/* Announcements Section */}
      <Box my={8} width={'1136px'}>
        <Heading as="h2" size="lg" mb={4}>
          Announcements
        </Heading>
        <VStack gap={'32px'} align="stretch">
          {mockAnnouncements.map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
        </VStack>
      </Box>

      <TextInput label="Date of Birth" width={10} icon={<Calendar />} />
      <br />
      <TextInput label="Name" width={18.75} icon={<User />} />
      <br />
      <TextInput label="Achievement" width={25} icon={<Award />} />
      <ProgramCard program={mockProgram} />
      <Flex direction={'row'} gap={'50px'}>
        <Flex direction={'column'} gap={'20px'}>
          <Button type="primary" pageColor="flamingo" text="Primary" height="60px" width="130px" />
          <Button type="secondary" pageColor="flamingo" text="Secondary" height="60px" width="130px" />
          <Button type="disabled" pageColor="flamingo" text="Disabled" height="60px" width="130px" />
        </Flex>
        <Flex direction={'column'} gap={'20px'}>
          <Button type="primary" pageColor="aqua" text="Primary" height="60px" width="130px" />
          <Button type="secondary" pageColor="aqua" text="Secondary" height="60px" width="130px" />
          <Button type="disabled" pageColor="aqua" text="Disabled" height="60px" width="130px" />
        </Flex>
      </Flex>
    </Box>
  );
}
