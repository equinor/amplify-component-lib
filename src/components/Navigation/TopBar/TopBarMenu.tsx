import React, { forwardRef, ReactNode, useEffect } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { spacings } from 'src/style';

import styled from 'styled-components';

interface MenuWrapperProps {
  $withGap: boolean;
}

const MenuWrapper = styled(Menu)<MenuWrapperProps>`
  padding: 0 !important;
  min-width: 350px;
  width: fit-content;
  border-radius: 5px;
  ${({ $withGap }) =>
    $withGap &&
    ` > div[role="menu"] {
      gap: ${spacings.large}; 
     
  }
  `}
`;

interface TopBarMenuContentProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  contentPadding?: boolean;
  isNotification?: boolean;
  withGap?: boolean;
}

const TopBarMenu = forwardRef<HTMLDivElement, TopBarMenuContentProps>(
  function TopBarRender(
    { open, onClose, children, anchorEl, isNotification, withGap = false },

    ref
  ) {
    // Close open window if user resize the screen.//
    useEffect(() => {
      const handleResize = () => {
        if (open) {
          onClose();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [open, onClose]);

    if (!open) return null;
    return (
      <MenuWrapper
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        placement={isNotification ? 'bottom' : 'bottom-end'}
        data-testid="top-bar-menu"
        ref={ref}
        $withGap={withGap}
      >
        {children}
      </MenuWrapper>
    );
  }
);
export default TopBarMenu;
