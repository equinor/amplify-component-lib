import React, { FC, ReactNode } from 'react';

import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const MenuWrapper = styled(Menu)`
  padding: 0 !important;
  width: 350px;
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

const ContentWrapper = styled.div`
  padding: ${spacings.comfortable.medium};
`;
interface TopBarMenuContentProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  anchorEl: HTMLElement | null;
}

const TopBarMenu: FC<TopBarMenuContentProps> = ({
  open,
  title,
  onClose,
  children,
  anchorEl,
}) => {
  if (!open) return null;

  return (
    <MenuWrapper
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      placement="top-end"
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
      <ContentWrapper>{children}</ContentWrapper>
    </MenuWrapper>
  );
};
export default TopBarMenu;
