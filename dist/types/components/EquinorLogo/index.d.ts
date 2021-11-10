import React from 'react';
export interface EquinorLogoProps {
    large?: boolean;
    color?: 'red' | 'white' | 'black';
    size?: 16 | 24 | 32 | 40 | 48;
}
declare const EquinorLogo: React.ForwardRefExoticComponent<EquinorLogoProps & React.RefAttributes<SVGSVGElement>>;
export default EquinorLogo;
