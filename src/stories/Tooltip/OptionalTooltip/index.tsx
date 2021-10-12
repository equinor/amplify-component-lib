import { PropsWithChildren } from 'react';
import { Tooltip, TooltipProps } from '@equinor/eds-core-react';

function OptionalTooltip({
  title,
  children,
  ...rest
}: PropsWithChildren<TooltipProps>) {
  if (title === undefined) {
    return <>{children}</>;
  }

  return (
    <Tooltip title={title} {...rest}>
      {children}
    </Tooltip>
  );
}

export default OptionalTooltip;
