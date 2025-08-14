import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Container } from 'src/molecules/Badge/Badge.styles';

export type Variants = 'default' | 'light' | 'danger' | 'empty';

export interface BadgeProps {
  value: number;
  variant?: Variants;
}

export const Badge: FC<BadgeProps> = ({ value, variant = 'default' }) => {
  return (
    <Container data-testid="badge-container" $variant={variant}>
      <Typography as="span" variant="label" group="navigation">
        {value}
      </Typography>
    </Container>
  );
};
