import React from 'react';
interface SideBarContextType {
    isOpen: boolean;
}
export declare function useSideBar(): SideBarContextType;
export declare const SideBarContext: React.Context<SideBarContextType | undefined>;
export declare const SideBar: React.ForwardRefExoticComponent<{
    onCreate?: (() => void) | undefined;
    createLabel?: string | undefined;
    open?: boolean | undefined;
    maxHeight?: string | undefined;
    onToggle?: ((state: boolean) => void) | undefined;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export {};
