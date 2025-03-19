import TextInput from '../../components/TextInput';
import ProgramCard from '../../components/ProgramCard';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { Program } from '@prisma/client';
import { User, Calendar, Award } from 'lucide-react';
import Button from '@/src/components/Button';

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

  return (
    <Box p={8} bg={'white'}>
      <Heading mb={6}>Development Page</Heading>
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
