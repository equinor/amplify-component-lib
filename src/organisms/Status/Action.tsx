import { forwardRef } from 'react';

import { Button } from '@equinor/eds-core-react';

import { DEFAULT_ACTION_TEXT } from './Status.constants';

interface ActionProps {
  onClick: () => void;
  buttonText?: string;
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ buttonText = DEFAULT_ACTION_TEXT, onClick }, ref) => {
    return (
      <Button ref={ref} onClick={onClick}>
        {buttonText}
      </Button>
    );
  }
);

Action.displayName = 'Status.Action';
