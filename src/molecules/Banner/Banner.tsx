import { FC, ReactElement } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';

import { Container } from './Banner.styles';
import { getIconSize, getVariantIcon } from './Banner.utils';

export interface BannerProps {
  variant: 'info' | 'warning' | 'danger';
  children: string | ReactElement | ReactElement[];
  spacing?: 'compact' | 'comfortable';
}

export const Banner: FC<BannerProps> = ({
  variant,
  children,
  spacing = 'comfortable',
}) => (
  <Container $variant={variant} $spacing={spacing}>
    <Icon data={getVariantIcon(variant)} size={getIconSize(spacing)} />
    {typeof children === 'string' ? (
      <Typography variant="body_long">{children}</Typography>
    ) : (
      children
    )}
  </Container>
);
