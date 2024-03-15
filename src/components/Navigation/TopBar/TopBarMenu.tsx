import React, { forwardRef, ReactNode, useEffect } from 'react';

import { Menu } from '@equinor/eds-core-react';

import { spacings } from 'src/style';

import styled from 'styled-components';

const MenuWrapper = styled(Menu)`
  padding: 0 !important;
  width: 350px;
  border-radius: 5px;
`;

interface ContentWrapperProps {
  $contentPadding: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  padding: ${(props) => (props.$contentPadding ? spacings.medium : '0px')};
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
      contentPadding = true,
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
        <ContentWrapper $contentPadding={contentPadding}>
          {children}
        </ContentWrapper>
      </MenuWrapper>
    );
  }
);
export default TopBarMenu;
