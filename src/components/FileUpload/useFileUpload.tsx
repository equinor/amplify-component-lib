import { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

// TODO:
// document stuff.

type FileType = {
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

export function useFileUpload(
  uploadFunction: (file: File) => Promise<string>,
  deleteFunction: (fileId: string) => Promise<string>,
  options?: FileUploadOptions
): FileUploadProps {
  const [files, setFiles] = useState<FileType[]>(
    options?.initialFiles?.map(
      (inf) =>
        ({
          data: inf,
          name: inf.name,
          size: inf.size,
          status: 'success',
          type: inf.type,
        } as FileType)
    ) ?? []
  );

  const addRejectedFiles = (rejectedFiles: FileRejection[]) => {
    const rejected = rejectedFiles.map(
      (rf) =>
        ({
          status: 'failed',
          name: rf.file.name,
          size: rf.file.size,
          data: rf.file,
          type: rf.file.type,
          error: true,
          errorMessage: rf.errors[0].message,
        } as FileType)
    );
    setFiles((f) => [...f, ...rejected]);
  };

  const uploadFile = (file: File, index: number) => {
    uploadFunction(file)
      .then((fileId: string) => {
        // Set file to success
        setFiles((f) => [
          ...f.slice(0, index),
          { ...f[index], status: 'success', fileId: fileId },
          ...f.slice(index + 1, f.length),
        ]);
      })
      .catch((error) => {
        // Set file to failed
        setFiles((f) => [
          ...f.slice(0, index),
          {
            ...f[index],
            status: 'failed',
            error: true,
            errorMessage: error,
            fileId: uuidv4(),
          },
          ...f.slice(index + 1, f.length),
        ]);
      });
  };

  const uploadFiles = async (files: File[]) => {
    const accepted = files.map(
      (f) =>
        ({
          status: 'uploading',
          name: f.name,
          size: f.size,
          type: f.type,
        } as FileType)
    );
    await setFiles((f) => [...f, ...accepted]);
    files.forEach((file, index) => {
      uploadFile(file, index);
    });
  };

  const deleteFile = async (fileId: string) => {
    setFiles(files.filter((f) => f.fileId !== fileId));

    const file = files.find((f) => f.fileId === fileId);
    if (file && !file.error) {
      try {
        return await deleteFunction(fileId);
      } catch {
        return 'Delete failed';
      }
    }
    return 'File not found';
  };

  const retryFile = (fileId: string) => {
    const index = files.findIndex((f) => f.fileId === fileId);
    setFiles((f) => [
      ...f.slice(0, index),
      { ...f[index], status: 'uploading', error: false, errorMessage: '' },
      ...f.slice(index + 1, f.length),
    ]);
    const file = files[index];
    uploadFile(file.data, index);
  };

  return {
    addRejectedFiles,
    deleteFile,
    uploadFiles,
    files,
    retryFile,
  };
}
