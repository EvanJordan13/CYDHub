import AuthWrapper from '@/src/components/AuthWrapper';
import { Box } from '@chakra-ui/react';

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <Box display="flex" minH="100vh">
        <Box flex={1}>{children}</Box>
      </Box>
    </AuthWrapper>
  );
}
