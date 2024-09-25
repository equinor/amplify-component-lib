import { FC } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';

import { DialogAction as DialogActionProps } from './Dialog';
import { OptionalTooltip } from 'src/molecules';

export const DialogAction: FC<DialogActionProps> = ({
  text,
  variant,
  color,
  onClick,
  icon,
  disabled,
}) => (
  <OptionalTooltip title={typeof disabled === 'string' ? disabled : ''}>
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled !== undefined && !!disabled}
    >
      {icon && <Icon data={icon} />}
      {text}
    </Button>
  </OptionalTooltip>
);
