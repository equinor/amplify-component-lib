import { FC } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';

import { DialogAction as DialogActionProps } from './Dialog';
import { OptionalTooltip } from 'src/molecules';

export const DialogAction: FC<DialogActionProps> = ({
  text,
  variant,
  onClick,
  icon,
  disabled,
}) => (
  <OptionalTooltip title={typeof disabled === 'string' ? disabled : ''}>
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled !== undefined}
    >
      {icon && <Icon data={icon} />}
      {text}
    </Button>
  </OptionalTooltip>
);
