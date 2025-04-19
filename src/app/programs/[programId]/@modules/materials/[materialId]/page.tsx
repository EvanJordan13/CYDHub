'use client';

import MaterialDetail from '@/src/components/MaterialDetail';
import { Flex, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { getMaterialById } from '@/src/lib/query/materials';
import { useEffect, useState } from 'react';
import { ModuleMaterial } from '@prisma/client';

export default function MaterialPage() {
  const params = useParams();
  const [material, setMaterial] = useState<ModuleMaterial>();
  const [isLoading, setIsLoading] = useState(true);

  const { materialId: materialIdString } = params;
  const materialId = Number(materialIdString);

  const fetchAssignment = async () => {
    try {
      const material = await getMaterialById(materialId);
      setMaterial(material);
    } catch (error) {
      console.error('Error fetching material:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAssignment();
      setIsLoading(false);
    };

    if (materialId) {
      loadData();
    }
  }, [materialId]);

  return isLoading ? (
    <Stack spaceY={4} mt={4}>
      <Flex direction={'row'} justify={'space-between'}>
        <Skeleton height="50px" width="50%" />
        <Skeleton height="50px" width="175px" />
      </Flex>
      <SkeletonText mt="4" noOfLines={3} gap="4" height="12px" />
      <Skeleton height="100px" width="100%" />
    </Stack>
  ) : (
    material && (
      <MaterialDetail
        title={material.title}
        overview={material.overview}
        materialType={material.materialType}
        fileName={material.fileName}
        fileUrl={material.fileUrl}
      />
    )
  );
}
