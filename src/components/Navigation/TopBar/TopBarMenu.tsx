import React, { forwardRef, ReactNode, useEffect } from 'react';

import { Menu } from '@equinor/eds-core-react';

import styled from 'styled-components';

const MenuWrapper = styled(Menu)`
  padding: 0 !important;
  min-width: 350px;
  width: fit-content;
  border-radius: 5px;
`;

interface TopBarMenuContentProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  contentPadding?: boolean;
  isNotification?: boolean;
}

const TopBarMenu = forwardRef<HTMLDivElement, TopBarMenuContentProps>(
  function TopBarRender(
    {
      open,
      onClose,
      children,
      anchorEl,

      isNotification,
    },

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
      >
        {children}
      </MenuWrapper>
    );
  }
);
export default TopBarMenu;
