import { forwardRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { DEFAULT_TITLE } from './Status.constants';

interface TitleProps {
  title?: string;
}
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ title = DEFAULT_TITLE }, ref) => (
    <Typography ref={ref} variant="h1" bold data-testid="title">
      {title}
    </Typography>
  )
);

Title.displayName = 'Status.Title';
