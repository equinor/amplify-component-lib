import { forwardRef } from 'react';

import { DEFAULT_TITLE } from './Status.constants';
import { Typography } from 'src/molecules';

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
