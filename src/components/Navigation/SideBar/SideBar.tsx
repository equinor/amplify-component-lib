import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import EquinorLogo from '../../Icons/EquinorLogo';
import CreateItem from './CreateItem';
import ToggleOpen from './ToggleOpen';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface ContainerProps {
  $width: string;
}

const Container = styled.div<ContainerProps>`
  border-right: 1px solid ${colors.ui.background__medium.hsla};
  background-color: ${colors.ui.background__default.hsla};
  display: flex;
  flex-direction: column;
  padding-bottom: ${spacings.comfortable.large};
  overflow: hidden;
  width: ${(props) => props.$width};
  min-width: ${(props) => props.$width};
  height: calc(100vh - 64px - 24px);
  position: sticky;
  top: 64px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${colors.ui.background__medium.hex};
  padding-top: ${spacings.comfortable.large};
`;

const TopContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  align-items: center;
`;

type SidebarType = {
  onCreate?: () => void;
  createLabel?: string;
  createDisabled?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const SideBar = forwardRef<HTMLDivElement, SidebarType>(
  ({ onCreate, createLabel, createDisabled = false, children }, ref) => {
    const { isOpen, setIsOpen } = useSideBar();

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Container
        $width={isOpen ? '256px' : '72px'}
        ref={ref}
        data-testid="sidebar"
      >
        <TopContainer>
          {onCreate && createLabel && (
            <CreateItem
              createLabel={createLabel}
              onCreate={onCreate}
              disabled={createDisabled}
            />
          )}
          {children}
        </TopContainer>
        <ToggleOpen isOpen={isOpen} toggle={handleToggle} />
        <LogoContainer>
          <EquinorLogo />
        </LogoContainer>
      </Container>
    );
  }
);

SideBar.displayName = 'SideBar';
