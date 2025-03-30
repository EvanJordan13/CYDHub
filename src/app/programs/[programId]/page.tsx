'use client';

import Module from '@/src/components/Module';
import SideBar from '@/src/components/SideBar';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Text, Heading, Box, Image, Tabs, Button as ChakraButton, Flex, IconButton, Stack } from '@chakra-ui/react';
import { fetchProgramMaterials, fetchProgramAssignments, getProgramModules } from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod } from '@prisma/client';
import { useState, useEffect } from 'react';

type ModuleWithRelations = Mod & {
  materials: ModuleMaterial[];
  assignments: Assignment[];
};

export default function ProgramPage() {
  const [programMaterials, setProgramMaterials] = useState<(ModuleMaterial & { moduleTitle: string })[]>([]);
  const [programAssignments, setProgramAssignments] = useState<(Assignment & { moduleTitle: string })[]>([]);
  const [programModules, setProgramModules] = useState<ModuleWithRelations[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [showMaterials, setShowMaterials] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const [showModules, setShowModules] = useState(true);

  const testFetchProgramMaterials = async () => {
    setIsLoadingMaterials(true);
    try {
      const materials = await fetchProgramMaterials(1);
      console.log('Program materials', materials);
      setProgramMaterials(materials);
    } catch (error) {
      console.error('Error fetching program materials:', error);
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  const testFetchProgramAssignments = async () => {
    setIsLoadingAssignments(true);
    try {
      const assignments = await fetchProgramAssignments(1);
      console.log('Program assignments', assignments);
      setProgramAssignments(assignments);
    } catch (error) {
      console.error('Error fetching program assignments:', error);
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  const testFetchProgramModules = async () => {
    setIsLoadingAssignments(true);
    try {
      const modules = await getProgramModules(1);
      // const modules = mockModules;
      console.log('Program modules', modules);
      setProgramModules(modules as ModuleWithRelations[]);
    } catch (error) {
      console.error('Error fetching program modules:', error);
    } finally {
      setIsLoadingModules(false);
    }
  };

  useEffect(() => {
    testFetchProgramMaterials();
    testFetchProgramAssignments();
    testFetchProgramModules();
  }, []);

  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'}>
      <SideBar page="Program" />
      <Box marginY={6} marginLeft={250} style={{ flexBasis: '80%' }}>
        <Box display={'flex'} height={'28px'} justifyContent={'space-between'}>
          <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
            Web Development
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
        {!isLoadingMaterials && !isLoadingAssignments && !isLoadingModules ? (
          programModules.map((module, index) => (
            <Module key={index} title={module.title} materials={module.materials} assignments={module.assignments} />
          ))
        ) : (
          <Text marginTop={10}>Loading...</Text>
        )}
      </Box>
    </Box>
  );
}
