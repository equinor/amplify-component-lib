import React, { forwardRef, ReactNode, useEffect } from 'react';

import {
  Button as EDSButton,
  Icon,
  Menu,
  Typography,
} from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

const MenuWrapper = styled(Menu)`
  padding: 0 !important;
  width: 300px;
  border-radius: 5px;
`;
const Button = styled(EDSButton)`
  span > svg {
    fill: ${colors.interactive.primary__resting.rgba};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${spacings.medium};
  padding-right: ${spacings.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  padding-bottom: ${spacings.small};
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
      title,
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
        {title && (
          <Header>
            <Typography group="ui" variant="accordion_header" as="span">
              {title}
            </Typography>
            <Button
              variant="ghost_icon"
              onClick={onClose}
              data-testid="close-button"
            >
              <Icon
                data={clear}
                color={colors.interactive.primary__resting.rgba}
              />
            </Button>
          </Header>
        )}

        <ContentWrapper $contentPadding={contentPadding}>
          {children}
        </ContentWrapper>
      </MenuWrapper>
    );
  }
);
export default TopBarMenu;
