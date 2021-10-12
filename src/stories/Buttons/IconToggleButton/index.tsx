import { forwardRef, useState } from "react";
import { Button, Icon } from "@equinor/eds-core-react";
import { IconData } from "@equinor/eds-icons";
import { Placement } from "@equinor/eds-core-react/dist/types/hooks";
import OptionalTooltip from "../../Tooltip/OptionalTooltip";

interface Tooltip {
  title: string;
  placement: Placement;
}

interface Toggle {
  icon: IconData;
  onClick?: () => void;
  tooltip?: Tooltip;
}

export interface IconToggleButtonProps {
  initialState: boolean;
  toggleOn: Toggle;
  toggleOff: Toggle;
  onClick?: (toggle: boolean) => void;
}

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
        placement={toggleOn.tooltip?.placement}
      >
        <Button ref={ref} variant="ghost_icon" onClick={handleToggleOff}>
          <Icon size={24} data={toggleOn.icon} />
        </Button>
      </OptionalTooltip>
    ) : (
      <OptionalTooltip
        title={toggleOff.tooltip?.title}
        placement={toggleOff.tooltip?.placement}
      >
        <Button ref={ref} variant="ghost_icon" onClick={handleToggleOn}>
          <Icon size={24} data={toggleOff.icon} />
        </Button>
      </OptionalTooltip>
    );
  }
);

export default IconToggleButton;
