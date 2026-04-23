import { FC } from 'react';

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
      trailingIcon={icon}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled !== undefined && !!disabled}
      loading={isLoading}
      label={text}
    />
  </OptionalTooltip>
);
