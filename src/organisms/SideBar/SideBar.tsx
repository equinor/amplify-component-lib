import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { CreateItem } from './CreateItem';
import {
  BottomItemContainer,
  CenterItemContainer,
  EquinorIconContainer,
  NavigationContainer,
  TopItemContainer,
} from './SideBar.styles';
import { ToggleOpen } from './ToggleOpen';
import { EquinorLogo } from 'src/molecules/EquinorLogo/EquinorLogo';
import { useSideBar } from 'src/providers/SideBarProvider';

interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showCreate?: boolean;
  bottomItem?: ReactNode;
}

interface BaseSideBar extends SideBarProps {
  onCreate?: undefined;
}

interface SideBarWithCreate extends SideBarProps {
  onCreate: () => void;
  createLabel: string;
  createDisabled?: boolean;
  createActive?: boolean;
}

export const SideBar = forwardRef<
  HTMLDivElement,
  SideBarWithCreate | BaseSideBar
>((props, ref) => {
  const { children, showCreate = true, bottomItem } = props;
  const { isOpen, setIsOpen } = useSideBar();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavigationContainer
      $width={isOpen ? '231px' : '64px'}
      ref={ref}
      data-testid="sidebar"
    >
      <TopItemContainer>
        <ToggleOpen isOpen={isOpen} toggle={handleToggle} />
        {props.onCreate && showCreate && (
          <CreateItem
            createLabel={props.createLabel}
            onCreate={props.onCreate}
            disabled={props.createDisabled}
            active={props.createActive}
          />
        )}
      </TopItemContainer>
      <CenterItemContainer>{children}</CenterItemContainer>
      <BottomItemContainer>
        {bottomItem}
        <EquinorIconContainer>
          <EquinorLogo />
        </EquinorIconContainer>
      </BottomItemContainer>
    </NavigationContainer>
  );
});

SideBar.displayName = 'SideBar';
