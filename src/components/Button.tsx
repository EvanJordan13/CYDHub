import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'disabled';
  pageColor: 'flamingo' | 'aqua';
  text: string;
  icon?: ReactNode;
  disableHover?: boolean;
  height: string;
  width: string;
  onClick?: () => void;
}

export default function Button({
  type,
  pageColor,
  text,
  icon,
  disableHover = false,
  height,
  width,
  onClick,
}: ButtonProps) {
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
        type === 'disabled' || disableHover
          ? { bg: primaryColor }
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
      <Flex gap={2} justify={'center'}>
        <Text fontWeight="700" color={textColor} fontSize="lg">
          {text}
        </Text>
        {icon && (
          <Box color={textColor} width={6} bg={'1px solid black'} pt={0.25}>
            {icon}
          </Box>
        )}
      </Flex>
    </Box>
  );
}
