import { FileWithPath } from 'react-dropzone';

import { file_description, IconData, library_pdf } from '@equinor/eds-icons';

export function readUploadedFileAsText(
  inputFile: FileWithPath
): Promise<string> {
  const temporaryFileReader = new FileReader();

  /* v8 ignore start */ // Rejection files not working
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    /* v8 ignore end */
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
}

export function isFileImage(fileName: string): boolean {
  return /\.(jpe?g|png|gif|bmp)$/i.test(fileName);
}

export function getFileIcon(fileName: string): IconData {
  const fileExtension = fileName.split('.').pop();

  switch (fileExtension) {
    case 'pdf':
      return library_pdf;
    default:
      return file_description;
  }
}
