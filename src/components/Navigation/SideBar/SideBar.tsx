import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import EquinorLogo from '../../Icons/EquinorLogo';
import CreateItem from './CreateItem';
import {
  BottomItemContainer,
  EquinorIconContainer,
  NavigationContainer,
  TopItemContainer,
} from './SideBar.styles';
import ToggleOpen from './ToggleOpen';
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
        {props.onCreate && showCreate && (
          <CreateItem
            createLabel={props.createLabel}
            onCreate={props.onCreate}
            disabled={props.createDisabled}
          />
        )}
        {children}
      </TopItemContainer>
      <BottomItemContainer>
        {bottomItem}
        <ToggleOpen isOpen={isOpen} toggle={handleToggle} />
        <EquinorIconContainer>
          <EquinorLogo />
        </EquinorIconContainer>
      </BottomItemContainer>
    </NavigationContainer>
  );
});

SideBar.displayName = 'SideBar';
