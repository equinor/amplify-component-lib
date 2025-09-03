import {
  FocusEventHandler,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';

import { IconData } from '@equinor/eds-icons';

import {
  Button,
  Container,
  HelperIconContainer,
  IconContainer,
  Label,
} from './IconCell.styles';
import {
  IconCellColors,
  IconCellStates,
  IconCellTypes,
} from './IconCell.types';
import { getIconCellColor, renderContent } from './IconCell.utils';
import { useThemeProvider } from 'src/atoms';

/**
 * IconCell component renders a styled button-like cell with an icon, optional label,
 * and optional helper icon. It supports various visual states and interaction handlers.
 *
 * @param {React.ReactNode} icon - Main icon displayed in the center of the cell.
 * @param {function} onClick - Callback fired when the cell is clicked.
 * @param {function} onFocus - Callback fired when the cell receives focus.
 * @param {function} onBlur - Callback fired when the cell loses focus.
 * @param {string} className - Optional CSS class for custom styling.
 * @param {boolean} [disabled=false] - Whether the cell is disabled.
 * @param {boolean} [selected=false] - Whether the cell is in a selected state.
 * @param {IconCellColors} [color=IconCellColors.DEFAULT] - Color theme of the cell.
 * @param {IconCellStates} [state=IconCellStates.DEFAULT] - Visual state of the cell: default, danger, or warning.
 * @param {string} label - Optional label text displayed inside the cell.
 * @param {IconCellTypes} [type=IconCellTypes.TRANSPARENT] - Type of the cell: transparent, coloured, or scribbled-out.
 * @param {React.ReactNode} helperIcon - Optional secondary icon displayed alongside the main icon.
 * @param {boolean} [noBorder=false] - Whether to render the cell without the default bottom border.
 * @param {'td' | 'div'} [as='td'] - Element type to render the container as.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the button element.
 */
export interface IconCellProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode | IconData;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  color?: IconCellColors;
  state?: IconCellStates;
  label?: string;
  type?: IconCellTypes;
  helperIcon?: ReactNode | IconData;
  noBorder?: boolean;
  as?: 'td' | 'div';
}

export const IconCell = forwardRef<HTMLButtonElement, IconCellProps>(
  (
    {
      icon,
      onClick,
      onFocus,
      onBlur,
      className,
      disabled = false,
      selected = false,
      color = IconCellColors.DEFAULT,
      state = IconCellStates.DEFAULT,
      label,
      type = IconCellTypes.TRANSPARENT,
      helperIcon,
      noBorder = false,
      as = 'td',
    },
    ref
  ) => {
    const { theme } = useThemeProvider();
    const { backgroundColor, iconColor } = getIconCellColor(color, theme);

    return (
      <Container className={className} as={as}>
        <Button
          ref={ref}
          $selected={selected}
          disabled={disabled}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          $color={color}
          $backgroundColor={backgroundColor}
          $state={state}
          $type={type}
          $noBorder={noBorder}
          $nonClickable={!(onClick && !disabled)}
        >
          <IconContainer>{renderContent(icon, iconColor)}</IconContainer>
          <Label>
            <span>{label}</span>
          </Label>
          <HelperIconContainer>
            {helperIcon && renderContent(helperIcon, iconColor)}
          </HelperIconContainer>
        </Button>
      </Container>
    );
  }
);

IconCell.displayName = 'IconCell';
