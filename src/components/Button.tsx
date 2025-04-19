import { Box, Text } from '@chakra-ui/react';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'disabled';
  pageColor: 'flamingo' | 'aqua';
  text: string;
  height: string;
  width: string;
  onClick?: () => void;
}

export default function Button({ type, pageColor, text, height, width, onClick }: ButtonProps) {
  const primaryColor =
    type === 'disabled' ? 'Gray' : type === 'primary' ? (pageColor === 'flamingo' ? 'Flamingo' : 'Aqua') : 'white';
  const textColor =
    type === 'disabled'
      ? 'DisabledWhite'
      : type === 'secondary'
        ? pageColor === 'flamingo'
          ? 'Flamingo'
          : 'Aqua'
        : 'white';
  const borderColor =
    type === 'disabled'
      ? 'Gray'
      : type === 'primary'
        ? pageColor === 'flamingo'
          ? 'FlamingoBorder'
          : 'AquaBorder'
        : textColor;

  return (
    <Box
      height={height}
      width={width}
      bg={primaryColor}
      _hover={
        type === 'disabled'
          ? { bg: 'Gray' }
          : {
              bg:
                type === 'primary'
                  ? pageColor === 'flamingo'
                    ? 'FlamingoHover'
                    : 'AquaHover'
                  : pageColor === 'flamingo'
                    ? 'SecondaryFlamingoHover'
                    : 'SecondaryAquaHover',
              textDecoration: 'underline',
              textDecorationColor: textColor,
            }
      }
      borderWidth={'thin'}
      borderColor={borderColor}
      borderRadius={'xl'}
      borderBottomWidth={'4px'}
      display="flex"
      alignItems={'center'}
      justifyContent={'center'}
      onClick={type === 'disabled' ? undefined : onClick}
    >
      <Text fontWeight={'700'} color={textColor} fontSize="clamp(12px, 1.11vw, 42px)">
        {text}
      </Text>
    </Box>
  );
}
