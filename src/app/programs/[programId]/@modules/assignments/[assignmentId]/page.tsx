'use client';

import AssignmentDetail from '@/src/components/AssignmentDetail';
import { Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { getAssignmentById } from '@/src/lib/query/assignments';
import { useEffect, useState } from 'react';
import { Assignment } from '@prisma/client';

export default function AssignmentPage() {
  const router = useRouter();
  const params = useParams();
  const [assignment, setAssignment] = useState<Assignment>();
  const [isLoading, setIsLoading] = useState(true);

  const { assignmentId: assignmentIdString } = params;
  const assignmentId = Number(assignmentIdString);

  const { programId } = params;

  const fetchAssignment = async () => {
    try {
      const assignment = await getAssignmentById(assignmentId);
      setAssignment(assignment);
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchAssignment();
      setIsLoading(false);
    };

    if (assignmentId) {
      loadInitialData();
    }
  }, [assignmentId]);

  const onBackClick = () => {
    router.push(`/programs/${programId}`);
  };

  return isLoading ? (
    <Stack spaceY={4} mt={4}>
      <Skeleton height="40px" width="50%" />
      <Skeleton height="40px" width="25%" />
      <SkeletonText mt="4" noOfLines={3} gap="4" height="12px" />
    </Stack>
  ) : (
    assignment && (
      <AssignmentDetail
        assignmentNumber={assignment.assignmentNumber}
        assignmentTitle={assignment.title}
        dueDate={assignment.dueDate}
        questionCount={assignment.questionCount}
        description={assignment.description}
        onBackClick={onBackClick}
      />
    )
  );
}
