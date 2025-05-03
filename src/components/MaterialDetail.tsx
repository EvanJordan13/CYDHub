import { useState } from 'react';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import Button from './Button';
import MaterialCard from './MaterialCard';
import { EyeOff, Eye, ArrowLeft } from 'lucide-react';

interface MaterialDetailProps {
  title: string;
  overview: string | null;
  materialType: string;
  fileName: string | null;
  fileUrl: string | null;
  onBackClick: () => void;
}

export default function MaterialDetail({
  title,
  overview,
  materialType,
  fileName,
  fileUrl,
  onBackClick,
}: MaterialDetailProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <Box position={'relative'} mt={6}>
      <Box position={'absolute'} top={0} right={0}>
        <Button
          type={'secondary'}
          pageColor={'aqua'}
          text={clicked ? 'Viewed' : 'Not Viewed'}
          icon={clicked ? <Eye /> : <EyeOff />}
          disableHover={true}
          height={'12'}
          width={'44'}
        />
      </Box>

      <Stack direction={'row'}>
        <IconButton variant={'ghost'} mt={-1} size={'md'} onClick={onBackClick}>
          <ArrowLeft strokeWidth={'3px'}></ArrowLeft>
        </IconButton>

        <Text fontWeight={'bold'} fontSize={'24px'}>
          <Box as="span">Material:</Box> {title}
        </Text>
      </Stack>

      {overview && (
        <Box>
          <Text fontWeight={'bold'} fontSize={'18px'} mt={6}>
            Overview:
          </Text>

          <Text mt={2}>{overview}</Text>
        </Box>
      )}

      <Box mt={10}>
        <MaterialCard name={fileName} url={fileUrl} type={materialType} clicked={clicked} setClicked={setClicked} />
      </Box>
    </Box>
  );
}
