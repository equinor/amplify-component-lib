import { forwardRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { DEFAULT_DESCRIPTION } from './Status.constants';

interface DescriptionProps {
  text?: string;
}
export const Description = forwardRef<HTMLHeadingElement, DescriptionProps>(
  ({ text = DEFAULT_DESCRIPTION }, ref) => (
    <Typography ref={ref} variant="h4" data-testid="description">
      {text}
    </Typography>
  )
);

Description.displayName = 'Status.Description';
