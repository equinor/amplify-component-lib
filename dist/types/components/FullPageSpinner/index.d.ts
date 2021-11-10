/// <reference types="react" />
interface IFullpageSpinnerProps {
    variant?: 'equinor' | 'circle' | 'dots';
    withoutScrim?: boolean;
}
declare const FullPageSpinner: React.FC<IFullpageSpinnerProps>;
export default FullPageSpinner;
