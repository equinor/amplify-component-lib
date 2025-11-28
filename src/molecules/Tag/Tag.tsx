import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { shape, spacings } from 'src/atoms/style';
import { TAG_COLORS } from 'src/molecules/Tag/Tag.utils';

import styled from 'styled-components';

interface ContainerProps {
  $color: NonNullable<TagProps['color']>;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.xx_small} ${spacings.x_small};
  gap: ${spacings.x_small};
  background: ${({ $color }) => TAG_COLORS[$color].background};
  min-height: calc(24px + 2 * ${spacings.xx_small});
  > span {
    color: ${({ $color }) => TAG_COLORS[$color].text};
    line-height: normal;
  }
  > svg {
    fill: ${({ $color }) => TAG_COLORS[$color].text};
  }
`;

export interface TagProps {
  color?:
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'dark pink'
    | 'pink'
    | 'grey';
  leadingIcon?: IconData;
  trailingIcon?: IconData;
  children: string;
}

export const Tag: FC<TagProps> = ({
  children,
  color = 'blue',
  leadingIcon,
  trailingIcon,
}) => {
  return (
    <Container $color={color}>
      {leadingIcon && <Icon data={leadingIcon} size={16} />}
      <Typography variant="cell_text" group="table" as="span">
        {children}
      </Typography>
      {trailingIcon && <Icon data={trailingIcon} size={16} />}
    </Container>
  );
};
