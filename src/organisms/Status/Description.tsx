import { forwardRef } from 'react';

import { DEFAULT_DESCRIPTION } from './Status.constants';
import { Typography } from 'src/molecules';

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
