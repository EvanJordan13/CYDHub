import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Button from './Button';
import MaterialCard from './MaterialCard';
import { EyeOff, Eye } from 'lucide-react';

interface MaterialDetailProps {
  title: string;
  overview: string | null;
  materialType: string;
  fileName: string | null;
  fileUrl: string | null;
}

export default function MaterialDetail({ title, overview, materialType, fileName, fileUrl }: MaterialDetailProps) {
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

      <Text fontWeight={'bold'} fontSize={'24px'}>
        <Box as="span">Material:</Box> {title}
      </Text>

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
