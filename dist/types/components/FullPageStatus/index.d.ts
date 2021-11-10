import { FC } from 'react';
export interface FullPageStatusProps {
    loading: boolean;
    error: boolean;
    errorMessage: string;
}
declare const FullPageStatus: FC<FullPageStatusProps>;
export default FullPageStatus;
