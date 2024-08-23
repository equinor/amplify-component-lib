import { FC } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';

import { DialogAction as DialogActionProps } from './Dialog';

export const DialogAction: FC<DialogActionProps> = ({
  text,
  variant,
  onClick,
  icon,
}) => (
  <Button variant={variant} onClick={onClick}>
    {icon && <Icon data={icon} />}
    {text}
  </Button>
);
