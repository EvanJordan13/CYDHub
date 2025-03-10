import { Box, Image } from '@chakra-ui/react';
import Button from '@/src/components/Button';

export default function OnboardingPage() {
  return (
    <Box bg={'white'} height={'100vh'} width={'100vw'}>
      <Image src="code-your-dreams-logo.svg" alt="Code Your Dreams" width={'283px'} />
      <Button type="primary" text="Button" height="60px" width="130px" />
      <Button type="secondary" text="Button" height="60px" width="130px" />
      <Button type="primary" text="Button" height="60px" width="130px" disabled={true} />
    </Box>
  );
}
