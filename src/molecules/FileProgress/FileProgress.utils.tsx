import { file_description, IconData, library_pdf } from '@equinor/eds-icons';

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
