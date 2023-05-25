import React, { forwardRef, ReactNode } from 'react';

import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const MenuWrapper = styled(Menu)`
  padding: 0 !important;
  width: 300px;
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${spacings.comfortable.medium};
  padding-right: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
  padding-bottom: ${spacings.comfortable.small};
`;

interface ContentWrapperProps {
  contentPadding: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  padding: ${(props) =>
    props.contentPadding ? spacings.comfortable.medium : '0px'};
`;

interface TopBarMenuContentProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  contentPadding?: boolean;
}

const TopBarMenu = forwardRef<HTMLDivElement, TopBarMenuContentProps>(
  function TopBarRender(
    { open, title, onClose, children, anchorEl, contentPadding = true },
    ref
  ) {
    if (!open) return null;
    return (
      <MenuWrapper
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        placement="top-end"
        data-testid="top-bar-menu"
        ref={ref}
      >
        <Header>
          <Typography group="ui" variant="accordion_header" as="span">
            {title}
          </Typography>
          <Button
            variant="ghost_icon"
            onClick={onClose}
            data-testid="close-button"
          >
            <Icon data={clear} />
          </Button>
        </Header>
        <ContentWrapper contentPadding={contentPadding}>
          {children}
        </ContentWrapper>
      </MenuWrapper>
    );
  }
);
export default TopBarMenu;
