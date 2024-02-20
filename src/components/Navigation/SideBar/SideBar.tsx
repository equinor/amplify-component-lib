import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import EquinorLogo from '../../Icons/EquinorLogo';
import CreateItem from './CreateItem';
import ToggleOpen from './ToggleOpen';
import { useSideBar } from 'src/providers/SideBarProvider';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $width: string;
}

const Container = styled.div<ContainerProps>`
  border-right: 1px solid ${colors.ui.background__medium.rgba};
  background-color: ${colors.ui.background__default.rgba};
  display: flex;
  flex-direction: column;
  padding-bottom: ${spacings.large};
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
  border-top: 1px solid ${colors.ui.background__medium.rgba};
  padding-top: ${spacings.large};
`;

const TopContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  align-items: center;
`;

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showCreate?: boolean;
}

interface SideBarWithoutCreate extends SidebarProps {
  onCreate?: undefined;
}

interface SidebarWithCreate extends SidebarProps {
  onCreate: () => void;
  createLabel: string;
  createDisabled?: boolean;
}

export const SideBar = forwardRef<
  HTMLDivElement,
  SidebarWithCreate | SideBarWithoutCreate
>((props, ref) => {
  const { children, showCreate = true } = props;
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
        {props.onCreate && showCreate && (
          <CreateItem
            createLabel={props.createLabel}
            onCreate={props.onCreate}
            disabled={props.createDisabled}
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
});

SideBar.displayName = 'SideBar';
