/// <reference types="react" />
import { IconData } from '@equinor/eds-icons';
import { Placement } from '@equinor/eds-core-react/dist/types/hooks';
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
declare const IconToggleButton: import("react").ForwardRefExoticComponent<IconToggleButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default IconToggleButton;
