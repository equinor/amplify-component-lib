import { FC } from 'react';
export interface FileProgressProps {
    error?: boolean;
    errorMsg?: string;
    fileId: string;
    loading?: boolean;
    name: string;
    onDelete: (fileId: string) => void;
    onRetry: (fileId: string) => void;
}
declare const FileProgress: FC<FileProgressProps>;
export default FileProgress;
