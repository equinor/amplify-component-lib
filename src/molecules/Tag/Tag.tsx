import { FC, ReactNode } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { shape, spacings } from 'src/atoms/style';
import { TAG_COLORS } from 'src/molecules/Tag/Tag.utils';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $color: NonNullable<TagProps['color']>;
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
  background: ${({ $color }) => TAG_COLORS[$color].background};
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
    color: ${({ $color, $textColor }) => $textColor ?? TAG_COLORS[$color].text};
    line-height: normal;
  }
  > svg {
    flex-shrink: 0;
    fill: ${({ $color, $iconColor }) => $iconColor ?? TAG_COLORS[$color].text};
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
    | 'grey';
  iconColor?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
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

export const Tag: FC<TagProps> = (props) => {
  const { color = 'blue', iconColor, className, style } = props;

  if (props.iconOnly) {
    return (
      <Container
        $color={color}
        $iconColor={iconColor}
        $iconOnly
        role="img"
        aria-label={props.label}
        className={className}
        style={style}
      >
        <Icon data={props.icon} size={16} />
      </Container>
    );
  }

  const { children, leadingIcon, trailingIcon, textColor } = props;

  return (
    <Container
      $color={color}
      $iconColor={iconColor}
      $textColor={textColor}
      className={className}
      style={style}
    >
      {leadingIcon && <Icon data={leadingIcon} size={16} />}
      <Typography variant="cell_text" group="table" as="span">
        {children}
      </Typography>
      {trailingIcon && <Icon data={trailingIcon} size={16} />}
    </Container>
  );
};
