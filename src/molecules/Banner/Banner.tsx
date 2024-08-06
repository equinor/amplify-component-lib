import { FC, ReactElement } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';

import { Container } from './Banner.styles';
import { getVariantIcon } from './Banner.utils';

export interface BannerProps {
  variant: 'info' | 'warning' | 'danger';
  children: string | ReactElement | ReactElement[];
}

export const Banner: FC<BannerProps> = ({ variant, children }) => {
  return (
    <Container $variant={variant}>
      <Icon data={getVariantIcon(variant)} />
      {typeof children === 'string' ? (
        <Typography variant="body_long">{children}</Typography>
      ) : (
        children
      )}
    </Container>
  );
};
