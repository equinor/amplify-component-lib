import React from 'react';
export interface IComponentProps {
    show: boolean;
    title?: string;
    body?: string;
    actions?: Array<JSX.Element>;
    actionPosition?: 'left' | 'right';
    onClose?: ((event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent, open: boolean) => void) | undefined;
}
declare const ConfirmationPopup: React.FC<IComponentProps>;
export default ConfirmationPopup;
