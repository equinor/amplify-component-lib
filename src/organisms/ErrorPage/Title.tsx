import { forwardRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

interface TitleProps {
  title?: string;
}
export const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ title = 'Oops! Something went wrong.' }, ref) => (
    <div ref={ref}>
      <Typography variant="h3" data-testid="title">
        {title}
      </Typography>
    </div>
  )
);

Title.displayName = 'ErrorPage.Title';
