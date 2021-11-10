import { FileRejection } from 'react-dropzone';
declare type FileType = {
    data: File;
    error?: boolean;
    errorMessage?: string;
    fileId?: string;
    name: string;
    size: number;
    status: 'success' | 'failed' | 'uploading';
    type: string;
};
interface FileUploadProps {
    addRejectedFiles: (rejectedFiles: FileRejection[]) => void;
    files: FileType[];
    uploadFiles: (files: File[]) => void;
    deleteFile: (fileId: string) => Promise<string>;
    retryFile: (fileId: string) => void;
}
interface FileUploadOptions {
    initialFiles?: File[];
}
export declare function useFileUpload(uploadFunction: (file: File) => Promise<string>, deleteFunction: (fileId: string) => Promise<string>, options?: FileUploadOptions): FileUploadProps;
export {};
