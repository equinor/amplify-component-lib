import { forwardRef } from 'react';

import { Button } from '@equinor/eds-core-react';

type ActionProps = {
  buttonText?: string;
  onClick?: () => void;
};

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ buttonText = 'Back to last page', onClick }, ref) => (
    <Button ref={ref} onClick={onClick}>
      {buttonText}
    </Button>
  )
);

Action.displayName = 'ErrorPage.Action';
