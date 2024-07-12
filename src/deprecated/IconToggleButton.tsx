import { forwardRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

interface Tooltip {
  title: string;
  placement: Placement | string;
}

interface Toggle {
  icon: IconData;
  onClick?: () => void;
  tooltip?: Tooltip;
}

export interface IconToggleButtonProps {
  initialState?: boolean;
  toggleOn: Toggle;
  toggleOff: Toggle;
  onClick?: (toggle: boolean) => void;
}

/**
 * @deprecated Being deprecated from amplify-component-lib move into app if you want the implementation
 */

const IconToggleButton = forwardRef<HTMLButtonElement, IconToggleButtonProps>(
  ({ initialState = false, toggleOn, toggleOff, onClick }, ref) => {
    const [toggle, setToggle] = useState(initialState);

    const handleToggleOff = () => {
      setToggle(false);
      onClick?.(toggle);
      toggleOn.onClick?.();
    };

    const handleToggleOn = () => {
      setToggle(true);
      onClick?.(toggle);
      toggleOff.onClick?.();
    };

    return toggle ? (
      <OptionalTooltip
        title={toggleOn.tooltip?.title}
        placement={toggleOn.tooltip?.placement as Placement}
      >
        <Button ref={ref} variant="ghost_icon" onClick={handleToggleOff}>
          <Icon size={24} data={toggleOn.icon} />
        </Button>
      </OptionalTooltip>
    ) : (
      <OptionalTooltip
        title={toggleOff.tooltip?.title}
        placement={toggleOff.tooltip?.placement as Placement}
      >
        <Button ref={ref} variant="ghost_icon" onClick={handleToggleOn}>
          <Icon size={24} data={toggleOff.icon} />
        </Button>
      </OptionalTooltip>
    );
  }
);

IconToggleButton.displayName = 'IconToggleButton';

export default IconToggleButton;
