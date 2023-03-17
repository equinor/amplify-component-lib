import { forwardRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

type DescriptionProps = {
  text?: string;
};
export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (
    {
      text = 'Try again later or use our feedback form if the problem persists.',
    },
    ref
  ) => (
    <div ref={ref}>
      <Typography variant="h4" data-testid="description">
        {text}
      </Typography>
    </div>
  )
);

Description.displayName = 'ErrorPage.Description';
