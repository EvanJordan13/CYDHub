'use client';

import { useState } from 'react';
import { Box, Text, IconButton, Collapsible } from '@chakra-ui/react';
import Resource from './Resource';
import { ChevronDown, ChevronUp, ClipboardMinus, Video } from 'lucide-react';
import { ModuleMaterial, Assignment } from '@prisma/client';

type ResourceItem = { type: 'assignment'; data: Assignment } | { type: 'material'; data: ModuleMaterial };

interface ModuleProps {
  title: string;
  materials: ModuleMaterial[];
  assignments: Assignment[];
  onClick: (resource: ResourceItem) => void;
}

export default function Module({ title, materials, assignments, onClick }: ModuleProps) {
  const [isOpen, setIsOpen] = useState(true);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleClick = (resource: ResourceItem) => {
    onClick(resource);
  };

  return (
    <Collapsible.Root marginTop={9} width={'96.5%'} defaultOpen={true}>
      <Box
        borderColor={'Aqua'}
        backgroundColor={'Aqua'}
        borderWidth={3}
        height={16}
        borderTopRadius={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
      >
        <Text color={'white'} fontWeight={'bold'}>
          {title}
        </Text>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          variant="plain"
          colorScheme="whiteAlpha"
          aria-label="Toggle section"
          as={Collapsible.Trigger}
          color={'white'}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </IconButton>
      </Box>
      <Collapsible.Content>
        <Box borderColor={'#B3B3BB'} borderWidth={1.5} borderBottomRadius={5}>
          {assignments.map((assignment, index) => (
            <Resource
              key={index}
              title={assignment.title}
              dueDate={assignment.dueDate ? formatDate(new Date(assignment.dueDate)) : 'No Due Date'}
              icon={<ClipboardMinus />}
              resourceType={'assignment'}
              onClick={() => handleClick({ type: 'assignment', data: assignment })}
            />
          ))}
          {materials.map((material, index) => (
            <Resource
              key={index}
              title={material.title}
              dueDate={'March 1, 2025'}
              icon={<Video />}
              resourceType={'material'}
              onClick={() => handleClick({ type: 'material', data: material })}
            />
          ))}
          {/* <Resource title={'Syllabus'} dueDate={'March 1st'} icon={<ClipboardMinus />} resourceType={'assignment'} />
          <Resource title={'Introduction to HTML'} dueDate={'March 1st'} icon={<Video />} resourceType={'assignment'} />
          <Resource title={'Lecture'} dueDate={'March 1st'} icon={<Video />} resourceType={'material'} /> */}
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
