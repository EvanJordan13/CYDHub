'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Text, Skeleton, Stack, SkeletonText, Box } from '@chakra-ui/react';
import Module from '@/src/components/Module';
import { getProgramModules } from '@/src/lib/query/programs';
import { ModuleMaterial, Assignment, Module as Mod } from '@prisma/client';
import { useModuleView } from '../layout';

type ModuleWithRelations = Mod & {
  materials: ModuleMaterial[];
  assignments: Assignment[];
};

type ResourceItem = { type: 'assignment'; data: Assignment } | { type: 'material'; data: ModuleMaterial };

export default function ModulesPage() {
  const { showAssignments, showMaterials } = useModuleView();

  const router = useRouter();
  const params = useParams();
  const programId = Number(params?.programId);

  const [programModules, setProgramModules] = useState<ModuleWithRelations[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);

  const handleModuleClick = (resource: ResourceItem) => {
    router.push(`/programs/${programId}/${resource.type}s/${resource.data.id}`);
  };

  const fetchModules = async () => {
    try {
      const modules = await getProgramModules(programId);
      setProgramModules(modules as ModuleWithRelations[]);
    } catch (error) {
      console.error('Error fetching program modules:', error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setProgramModules([]);
      await fetchModules();
      setIsLoadingModules(false);
    };

    if (programId) {
      loadInitialData();
    }
  }, [programId]);

  const filteredModules = programModules.map(module => ({
    ...module,
    materials: showMaterials ? module.materials : [],
    assignments: showAssignments ? module.assignments : []
  })).filter(module =>
    (showAssignments && module.assignments.length > 0) ||
    (showMaterials && module.materials.length > 0)
  );


  return isLoadingModules ? (
    <Stack gap={6}>
      {[...Array(3)].map((_, i) => (
        <Box key={i} padding="5" boxShadow="md" bg="white" borderWidth="1px" borderRadius="lg">
          <Skeleton height="20px" width="45%" mb="4" />
          <SkeletonText mt="4" noOfLines={3} gap="4" height="12px" />
        </Box>
      ))}
    </Stack>
  ) : filteredModules.length > 0 ? (
    filteredModules.map((module, index) => (
      <Module
        key={index}
        title={module.title}
        materials={module.materials}
        assignments={module.assignments}
        onClick={handleModuleClick}
      />
    ))
  ) : (
    <Text mt={4}>No {(showAssignments && showMaterials) ? 'Modules' : (showAssignments) ? 'Assignments' : 'Materials'} found.</Text>
  );
}
