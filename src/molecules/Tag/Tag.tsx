import { ReactNode } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { shape, spacings } from 'src/atoms/style';
import { TAG_COLORS } from 'src/molecules/Tag/Tag.utils';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $color: NonNullable<BaseTagProps['color']>;
  $variant: NonNullable<BaseTagProps['variant']>;
  $iconColor?: string;
  $textColor?: string;
  $iconOnly?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.xx_small} ${spacings.x_small};
  gap: ${spacings.x_small};
  background: ${({ $color, $variant }) =>
    TAG_COLORS[$variant][$color].background};
  ${({ $color, $variant }) => {
    const { border } = TAG_COLORS[$variant][$color];
    // Outline does not take up space, so the tag size is the same for all variants
    return border && `outline: 1px solid ${border};`;
  }}
  min-height: 24px;
  min-width: fit-content;
  width: fit-content;

  ${({ $iconOnly }) =>
    $iconOnly &&
    css`
      justify-content: center;
      padding: 4px;
      min-width: 24px;
    `}

  > span {
    color: ${({ $color, $variant, $textColor }) =>
      $textColor ?? TAG_COLORS[$variant][$color].text};
    line-height: normal;
  }
  > svg {
    flex-shrink: 0;
    fill: ${({ $color, $variant, $iconColor }) =>
      $iconColor ?? TAG_COLORS[$variant][$color].text};
  }
`;

export interface BaseTagProps {
  color?:
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'dark pink'
    | 'pink'
    | 'grey'
    | 'white'
    | 'success'
    | 'warning'
    | 'danger';
  /** @default 'pastel' */
  variant?: 'pastel' | 'vibrant' | 'outlined';
  iconColor?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  'data-testid'?: string;
}

export interface DefaultTagProps extends BaseTagProps {
  iconOnly?: false;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
  textColor?: string;
  children: ReactNode;
}

export interface IconTagProps extends BaseTagProps {
  iconOnly: true;
  icon: IconData;
  /** Accessible label, since the tag has no visible text */
  label: string;
}

export type TagProps = DefaultTagProps | IconTagProps;

export function Tag(props: TagProps) {
  const {
    color = 'blue',
    variant = 'pastel',
    iconColor,
    className,
    style,
    'data-testid': dataTestId
  } = props;

  if (props.iconOnly) {
    return (
      <Container
        $color={color}
        $variant={variant}
        $iconColor={iconColor}
        $iconOnly
        role="img"
        aria-label={props.label}
        className={className}
        style={style}
        data-testid={dataTestId}
      >
        <Icon data={props.icon} size={16} />
      </Container>
    );
  }

  const { children, leadingIcon, trailingIcon, textColor } = props;

  return (
    <Container
      $color={color}
      $variant={variant}
      $iconColor={iconColor}
      $textColor={textColor}
      className={className}
      style={style}
      data-testid={dataTestId}
    >
      {leadingIcon && <Icon data={leadingIcon} size={16} />}
      <Typography variant="cell_text" group="table" as="span">
        {children}
      </Typography>
      {trailingIcon && <Icon data={trailingIcon} size={16} />}
    </Container>
  );
}
