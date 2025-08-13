import { forwardRef, ReactNode, RefObject } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { MenuButtonStyle } from './MenuBar.styles';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

export interface MenuButtonProps {
  ref?: RefObject<HTMLButtonElement>;
  children?: ReactNode;
  icon: IconData;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      icon,
      onClick,
      active = false,
      disabled = false,
      tooltip,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <OptionalTooltip title={tooltip} enterDelay={300}>
        <div>
          <MenuButtonStyle
            ref={ref}
            $active={active}
            onClick={onClick}
            disabled={disabled}
            type="button"
            {...props}
          >
            <Icon data={icon} />
            {children}
          </MenuButtonStyle>
        </div>
      </OptionalTooltip>
    );
  }
);

MenuButton.displayName = 'MenuButton';
