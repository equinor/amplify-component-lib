import {
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useContext,
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
  IconCellColor,
  IconCellColors,
  IconCellState,
  IconCellStates,
  IconCellVariant,
  IconCellVariants,
} from './IconCell.types';
import { getIconCellColor, renderContent } from './IconCell.utils';
import { Theme } from 'src/atoms';
import { ThemeProviderContext } from 'src/providers/ThemeProvider/ThemeProvider';

type ScribbledOutType = typeof IconCellVariants.SCRIBBLED_OUT;

type SharedProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  color?: IconCellColor;
  state?: IconCellState;
  label?: string;
  helperIcon?: ReactNode | IconData;
  noBottomBorder?: boolean;
  as?: 'td' | 'div';
} & HTMLAttributes<HTMLButtonElement>;

type ScribbledOutProps = {
  variant: ScribbledOutType;
  icon?: never; // explicitly disallow icon
} & SharedProps;

export type RegularIconCellProps = {
  variant?: Exclude<IconCellVariant, ScribbledOutType>;
  icon: ReactNode | IconData;
} & SharedProps;

export type IconCellProps = ScribbledOutProps | RegularIconCellProps;

/**
 * IconCell component renders a styled button-like cell with an icon, optional label,
 * and optional helper icon. It supports various visual states and interaction handlers.
 *
 * ### Special case
 * When `variant` is `IconCellVariants.SCRIBBLED_OUT`, this component renders a scribbled-out cell and so the icon becomes optional.
 *
 * @param {IconCellProps} props - Component props.
 * @param {React.ReactNode | IconData} [props.icon] - Main icon displayed in the center of the cell.
 * @param {MouseEventHandler<HTMLButtonElement>} [props.onClick] - Callback fired when the cell is clicked.
 * @param {boolean} [props.disabled=false] - Whether the cell is disabled.
 * @param {boolean} [props.selected=false] - Whether the cell is in a selected state.
 * @param {string} [props.className] - Optional CSS class for custom styling.
 * @param {IconCellColor} [props.color=IconCellColors.DEFAULT] - Color theme of the cell.
 * @param {IconCellState} [props.state=IconCellStates.DEFAULT] - Visual state of the cell: default, danger, or warning.
 * @param {string} [props.label] - Optional label text displayed inside the cell.
 * @param {IconCellVariant} [props.variant=IconCellVariants.DEFAULT] - Variant of the cell: `transparent`, `coloured`, or the special `scribbled-out`.
 * @param {React.ReactNode | IconData} [props.helperIcon] - Optional secondary icon displayed in the corner.
 * @param {boolean} [props.noBottomBorder=false] - Whether to render the cell without the default bottom border.
 * @param {'td' | 'div'} [props.as='td'] - Element type to render the outer container as.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the inner button element.
 * @returns {JSX.Element} The rendered IconCell.
 */
export const IconCell = forwardRef<HTMLButtonElement, IconCellProps>(
  function IconCell(props, ref) {
    const themeContext = useContext(ThemeProviderContext);

    // ScribbledOutProps
    if (props.variant === IconCellVariants.SCRIBBLED_OUT) {
      const { className, as = 'td', noBottomBorder = false } = props;

      return (
        <Container className={className} as={as}>
          <Button
            ref={ref}
            $variant={IconCellVariants.SCRIBBLED_OUT}
            $noBottomBorder={noBottomBorder}
            $clickable={false}
          />
        </Container>
      );
    }

    // RegularIconCellProps
    const {
      icon,
      onClick,
      className,
      disabled = false,
      selected = false,
      color = IconCellColors.DEFAULT,
      state = IconCellStates.DEFAULT,
      label,
      variant = IconCellVariants.DEFAULT,
      helperIcon,
      noBottomBorder = false,
      as = 'td',
      ...dom
    } = props;

    const { backgroundColor, iconColor } = getIconCellColor(
      color,
      themeContext?.theme ?? Theme.LIGHT
    );

    return (
      <Container className={className} as={as}>
        <Button
          ref={ref}
          {...dom}
          $selected={selected}
          disabled={disabled}
          onClick={onClick}
          $backgroundColor={backgroundColor}
          $state={state}
          $variant={variant}
          $noBottomBorder={noBottomBorder}
          $clickable={!!onClick && !disabled}
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
