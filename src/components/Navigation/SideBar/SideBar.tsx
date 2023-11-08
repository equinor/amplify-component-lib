import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import EquinorLogo from '../../Icons/EquinorLogo';
import CreateItem from './CreateItem';
import { borderBottomColor } from './MenuItem.utils';
import { SidebarTheme } from './SideBar.types';
import { backgroundColor, borderColor } from './SideBar.utils';
import ToggleOpen from './ToggleOpen';
import { useSideBar } from 'src/providers/SideBarProvider';

import styled from 'styled-components';

const { spacings } = tokens;

interface ContainerProps {
  $theme: SidebarTheme;
  $width: string;
}

const Container = styled.div<ContainerProps>`
  border-right: 1px solid ${({ $theme }) => borderColor($theme)};
  background-color: ${({ $theme }) => backgroundColor($theme)};
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

interface LogoContainerProps {
  $theme: SidebarTheme;
}

const LogoContainer = styled.div<LogoContainerProps>`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ $theme }) => borderBottomColor($theme)};
  padding-top: ${spacings.comfortable.large};
`;

const TopContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  align-items: center;
`;

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  theme?: keyof typeof SidebarTheme;
  children: ReactNode;
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
  const { theme = SidebarTheme.light, children } = props;
  const { isOpen, setIsOpen } = useSideBar();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container
      $theme={SidebarTheme[theme]}
      $width={isOpen ? '256px' : '72px'}
      ref={ref}
      data-testid="sidebar"
    >
      <TopContainer>
        {props.onCreate && (
          <CreateItem
            theme={SidebarTheme[theme]}
            createLabel={props.createLabel}
            onCreate={props.onCreate}
            disabled={props.createDisabled}
          />
        )}
        {children}
      </TopContainer>
      <ToggleOpen
        theme={SidebarTheme[theme]}
        isOpen={isOpen}
        toggle={handleToggle}
      />
      <LogoContainer $theme={SidebarTheme[theme]}>
        <EquinorLogo color={theme === SidebarTheme.light ? 'red' : 'white'} />
      </LogoContainer>
    </Container>
  );
});

SideBar.displayName = 'SideBar';
