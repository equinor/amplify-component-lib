import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';

import { DialogAction as DialogActionProps } from './Dialog';
import { Button } from 'src/molecules/Button/Button';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

export const DialogAction: FC<DialogActionProps> = ({
  text,
  variant,
  color,
  onClick,
  icon,
  disabled,
  isLoading = false,
}) => (
  <OptionalTooltip title={typeof disabled === 'string' ? disabled : ''}>
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled !== undefined && !!disabled}
      loading={isLoading}
    >
      {icon && <Icon data={icon} />}
      {text}
    </Button>
  </OptionalTooltip>
);
