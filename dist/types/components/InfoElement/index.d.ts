import React, { ReactElement } from 'react';
export interface InfoElementProps {
    title: string;
    content: ReactElement | string;
    capitalizeContent?: boolean;
    copyableContent?: boolean;
    copyIconRightPos?: string;
}
declare const InfoElement: React.ForwardRefExoticComponent<InfoElementProps & React.RefAttributes<HTMLDivElement>>;
export default InfoElement;
