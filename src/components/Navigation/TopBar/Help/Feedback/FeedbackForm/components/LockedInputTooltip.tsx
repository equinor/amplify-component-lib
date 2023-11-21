import { forwardRef, ReactNode, useMemo } from 'react';

import OptionalTooltip from '../../../../../../DataDisplay/OptionalTooltip';

export interface LockedInputTooltipProps {
  show: boolean;
  children: ReactNode;
}

const LockedInputTooltip = forwardRef<HTMLDivElement, LockedInputTooltipProps>(
  ({ show, children }, ref) => {
    const tooltipTitle = useMemo(() => {
      if (show) {
        return 'This input is locked because this request is already submitted to Service Now. If you want to make a new request please use the reset button in the bottom left corner';
      }
      return '';
    }, [show]);

    return (
      <OptionalTooltip title={tooltipTitle}>
        <div ref={ref}>{children}</div>
      </OptionalTooltip>
    );
  }
);

LockedInputTooltip.displayName = 'LockedInputTooltip';
export default LockedInputTooltip;
