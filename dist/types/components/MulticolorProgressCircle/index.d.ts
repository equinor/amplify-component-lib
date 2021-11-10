import React from 'react';
export declare type ColoredProgressCircle = {
    fillPercent: number;
    color: string;
};
export interface MulticolorProgressCircleProps {
    completed: number;
    data: Array<ColoredProgressCircle>;
    size?: string;
}
declare const MulticolorProgressCircle: React.FC<MulticolorProgressCircleProps>;
export default MulticolorProgressCircle;
