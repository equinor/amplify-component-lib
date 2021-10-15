import { forwardRef } from 'react';
import { Tooltip, TooltipProps } from '@equinor/eds-core-react';

const OptionalTooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ title, children, ...rest }, ref) => {
    if (title === undefined) {
      return <>{children}</>;
    }

    return (
      <Tooltip ref={ref} title={title} {...rest}>
        {children}
      </Tooltip>
    );
  }
);

OptionalTooltip.displayName = 'OptionalTooltip';

export default OptionalTooltip;
