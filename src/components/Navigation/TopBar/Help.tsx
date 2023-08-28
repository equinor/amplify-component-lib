import { forwardRef, ReactNode, useRef, useState } from 'react';

import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import {
  external_link,
  file_description,
  help_outline,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import TopBarMenu from './TopBarMenu';

import styled from 'styled-components';

const { colors, spacings } = tokens;

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

const ContentWrapper = styled.div`
  padding: 0 ${spacings.comfortable.medium};
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
`;

const Spacer = styled.div`
  display: flex;
`;

export interface HelpProps {
  applicationName: string;
  hideDefaultMenuItems?: boolean;
  children?: ReactNode;
}

export const Help = forwardRef<HTMLDivElement, HelpProps>(
  ({ applicationName, hideDefaultMenuItems = false, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
      <>
        <Button
          variant="ghost_icon"
          ref={buttonRef}
          id="anchor-match"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="menu-match"
          onClick={toggleMenu}
        >
          <Icon
            data={help_outline}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>

        <TopBarMenu
          open={isOpen}
          title="Help"
          onClose={closeMenu}
          anchorEl={buttonRef.current}
          ref={ref}
        >
          {!hideDefaultMenuItems && (
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
              <Spacer />
              <Icon
                data={external_link}
                size={24}
                color={colors.interactive.primary__resting.hsla}
              />
            </MenuLinkItem>
          )}
          {children && !hideDefaultMenuItems && (
            <Divider style={{ margin: 0 }} />
          )}
          {children && (
            <ContentWrapper onClick={closeMenu}>{children}</ContentWrapper>
          )}
        </TopBarMenu>
      </>
    );
  }
);

Help.displayName = 'Help';
