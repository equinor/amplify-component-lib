import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import { Container } from './InformationalNotice.styles';
import { getIconSize } from './InformationalNotice.utils';
import { colors } from 'src/atoms/style';

export interface InformationalNoticeProps {
  color?: 'grey' | 'white';
  spacing?: 'compact' | 'comfortable';
  children: string;
}

export const InformationalNotice: FC<InformationalNoticeProps> = ({
  children,
  color = 'grey',
  spacing = 'comfortable',
}) => (
  <Container $spacing={spacing} $color={color}>
    <Icon
      data={info_circle}
      color={colors.text.static_icons__default.rgba}
      size={getIconSize(spacing)}
    />
    <Typography variant="body_long">{children}</Typography>
  </Container>
);
