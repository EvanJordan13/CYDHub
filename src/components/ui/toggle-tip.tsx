import { Popover as ChakraPopover, IconButton, Portal, Box } from '@chakra-ui/react';
import * as React from 'react';
import { Info } from 'lucide-react';

export interface ToggleTipProps extends ChakraPopover.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content?: React.ReactNode;
}

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(function ToggleTip(props, ref) {
  const { showArrow = true, children, portalled = true, content, portalRef, ...rest } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ChakraPopover.Root
      {...rest}
      positioning={{ ...rest.positioning, gutter: 4, placement: 'top' }}
      onOpenChange={details => setIsOpen(details.open)}
    >
      <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <Box position="relative">
            <ChakraPopover.Content
              width="auto"
              px="2"
              py="1"
              textStyle="xs"
              rounded="sm"
              ref={ref}
              position="relative"
              zIndex={2}
              bg="Flamingo"
              color="white"
            >
              <Box position="relative">
                {content}
                {showArrow && isOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid #BC3860',
                    }}
                  />
                )}
              </Box>
            </ChakraPopover.Content>
          </Box>
        </ChakraPopover.Positioner>
      </Portal>
    </ChakraPopover.Root>
  );
});

export const InfoTip = React.forwardRef<HTMLDivElement, Partial<ToggleTipProps>>(function InfoTip(props, ref) {
  const { children, ...rest } = props;
  return (
    <ToggleTip content={children} {...rest} ref={ref}>
      <IconButton variant="ghost" aria-label="info" size="2xs">
        <Info />
      </IconButton>
    </ToggleTip>
  );
});
