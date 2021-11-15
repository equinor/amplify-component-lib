import React from 'react';
interface ToggleOpenProps {
    isOpen: boolean;
    toggle: () => void;
}
declare const ToggleOpen: React.FC<ToggleOpenProps>;
export default ToggleOpen;
