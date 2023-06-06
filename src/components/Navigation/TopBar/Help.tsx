import React, { forwardRef, useState } from 'react';

import {
  Button,
  Icon,
  Menu as EDSMenu,
  Typography,
} from '@equinor/eds-core-react';
import {
  clear,
  external_link,
  file_description,
  help_outline,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${spacings.comfortable.medium_small};
`;

const Menu = styled(EDSMenu)`
  padding: ${spacings.comfortable.large};
`;

const MenuLinkItem = styled.a`
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 16px 8px;
  text-decoration: none;
  gap: ${spacings.comfortable.medium};

  &:hover {
    background-color: #f7f7f7;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
  padding-right: 50px;
`;

export interface HelpProps {
  applicationName: string;
}

export const Help = forwardRef<HTMLButtonElement, HelpProps>(
  ({ applicationName }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);

    const openMenu = (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      const target = e.target as HTMLButtonElement;
      setAnchorEl(target);
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button
          variant="ghost_icon"
          ref={setAnchorEl}
          id="anchor-match"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="menu-match"
          onClick={(e) => (isOpen ? closeMenu() : openMenu(e))}
        >
          <Icon
            data={help_outline}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>

        <Menu
          open={isOpen}
          id="menu-match"
          aria-labelledby="anchor-match"
          onClose={closeMenu}
          anchorEl={anchorEl}
          matchAnchorWidth
        >
          <Header>
            <Typography group="heading" variant="h6" as="span">
              Help
            </Typography>
            <Button variant="ghost_icon" onClick={closeMenu}>
              <Icon data={clear} />
            </Button>
          </Header>
          <MenuLinkItem
            as="a"
            onClick={closeMenu}
            href={`https://amplify.equinor.com/releasenotes?app=%5B"${applicationName}"%5D`}
            target="_blank"
          >
            <ContentInfo>
              <Icon
                data={file_description}
                size={24}
                color={colors.interactive.primary__resting.hsla}
              />
              <Typography group="navigation" variant="menu_title" as="span">
                Release notes
              </Typography>
            </ContentInfo>
            <Icon
              data={external_link}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </MenuLinkItem>
        </Menu>
      </>
    );
  }
);

Help.displayName = 'TopBar.Help';
