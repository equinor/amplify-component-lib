/// <reference types="react" />
declare const OptionalTooltip: import("react").ForwardRefExoticComponent<{
    placement?: import("@equinor/eds-core-react/dist/types/hooks").Placement | undefined;
    title?: string | undefined;
    children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> & import("react").RefAttributes<HTMLElement>;
    enterDelay?: number | undefined;
} & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default OptionalTooltip;
