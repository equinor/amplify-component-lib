import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import { Header, ScrimWrapper, Sheet, Wrapper } from './SideSheet.styles';
import type { SideSheetProps } from './SideSheet.types';
import { Button } from 'src/molecules/Button/Button';

import { AnimatePresence } from 'motion/react';

/**
 * @description Side Sheet - Assumes you have a TopBar and that it is being used inside Template.Content
 * @param open - If the side sheet should be open
 * @param onClose - Called when clicking 'x' in the side sheet header
 * @param title - Title to display in the header
 * @param type - How the side sheet should be position, default is standard
 * @param headerElements - Optional spot to put elements in the header, for example more action buttons
 * @param width - Optional width override (number is treated as px)
 * @param children - Content in the side sheet
 */
export const SideSheet: FC<SideSheetProps> = ({
  open,
  onClose,
  title,
  type = 'standard',
  headerElements,
  width,
  children,
  ...rest
}) => {
  if ('withScrim' in rest && rest.withScrim) {
    return (
      <ScrimWrapper
        data-testid="side-sheet-scrim"
        onClick={open ? onClose : undefined}
        $zIndex={'zIndex' in rest ? rest.zIndex : undefined}
        initial={{
          display: 'none',
          background: 'rgba(111,111,111,0)',
        }}
        animate={{
          background: open ? 'rgba(111,111,111,0.35)' : 'rgba(111,111,111,0)',
          display: open ? 'block' : 'none',
        }}
      >
        <SideSheetContent
          open={open}
          onClose={onClose}
          title={title}
          type="modal"
          headerElements={headerElements}
          width={width}
          zIndex={'zIndex' in rest ? rest.zIndex : undefined}
          withScrim
        >
          {children}
        </SideSheetContent>
      </ScrimWrapper>
    );
  }

  if (type === 'modal' || type === 'floating') {
    return (
      <SideSheetContent
        open={open}
        onClose={onClose}
        title={title}
        type={type}
        headerElements={headerElements}
        width={width}
        zIndex={'zIndex' in rest ? rest.zIndex : undefined}
      >
        {children}
      </SideSheetContent>
    );
  }

  return (
    <SideSheetContent
      open={open}
      onClose={onClose}
      title={title}
      type={type}
      headerElements={headerElements}
      width={width}
    >
      {children}
    </SideSheetContent>
  );
};

function SideSheetContent({
  open,
  onClose,
  title,
  type = 'standard',
  headerElements,
  width,
  children,
  ...rest
}: SideSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <Wrapper
          $type={type}
          $withShadow={!('withScrim' in rest && rest.withScrim)}
          $zIndex={'zIndex' in rest ? rest.zIndex : undefined}
          initial={{
            x: type !== 'standard' ? '110%' : undefined,
            width: type === 'standard' ? 0 : undefined,
          }}
          animate={{
            x: type !== 'standard' ? 0 : undefined,
            width: type === 'standard' ? 'auto' : undefined,
          }}
          exit={{
            x: type !== 'standard' ? '110%' : undefined,
            width: type === 'standard' ? 0 : undefined,
          }}
          transition={{
            bounce: 0.25,
          }}
        >
          <Sheet $type={type} $width={width}>
            <Header>
              <Typography variant="h2">{title}</Typography>
              {headerElements && <section>{headerElements}</section>}
              <Button
                aria-label="close side sheet"
                variant="ghost_icon"
                onClick={onClose}
                style={{
                  gridColumn: 3,
                }}
              >
                <Icon data={close} />
              </Button>
            </Header>
            {children}
          </Sheet>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
