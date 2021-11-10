import React from 'react';
export interface ProgressBarProps {
    progress: number;
    displayValue?: number;
    backgroundColor?: string;
    fillColor?: string;
    displayValueInBar?: boolean;
    valueUnit?: string;
    style?: React.CSSProperties;
    className?: string | undefined;
    valueColor?: string;
}
declare const ProgressBar: React.FC<ProgressBarProps>;
export default ProgressBar;
