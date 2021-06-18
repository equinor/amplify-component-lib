import { FC, useState } from "react";
import { Snackbar } from "@equinor/eds-core-react";
import FileUploadArea from "../FileUploadArea";
import { FileRejection } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import FileProgress from "../FileProgress";
import { useFileUpload } from "./useFileUpload";

const FileUpload: FC = () => {
  const {
    addRejectedFiles,
    uploadFiles,
    deleteFile,
    files,
    retryFile,
  } = useFileUpload(
    (file: File) => {
      const promiseA = new Promise<string>((resolve, reject) => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          if (Math.random() >= 0.9) {
            reject("Failed to upload");
          } else {
            resolve(uuidv4());
          }
        }, 2000);
      });
      return promiseA;
    },
    (fileId: string) => {
      const promiseA = new Promise<string>((resolve, reject) => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          if (Math.random() >= 0.9) {
            reject(`Failed to deleted: ${fileId}`);
          } else {
            resolve(`Deleted file: ${fileId}`);
          }
        }, 2000);
      });
      return promiseA;
    }
  );

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackBarText, setSnackbarText] = useState<string>("");

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    uploadFiles(acceptedFiles);
    addRejectedFiles(fileRejections);
  };

  const onDelete = async (fileId: string) => {
    const response = await deleteFile(fileId);
    setShowSnackbar(true);
    setSnackbarText(response);
  };

  return (
    <>
      <div style={{ width: "350px" }}>
        <FileUploadArea
          accept={".csv,.jpg,.jpeg,.pdf,.ppt,.docx,.xls,.xlsx"}
          onDrop={onDrop}
        />
        {files.map((file) => (
          <FileProgress
            key={file.name}
            fileId={file.fileId ?? ""}
            name={file.name}
            onDelete={() => onDelete(file.fileId ?? "")}
            onRetry={() => retryFile(file.fileId ?? "")}
            loading={file.status === "uploading"}
            error={file.error}
            errorMsg={file.errorMessage}
          />
        ))}
      </div>
      <Snackbar open={showSnackbar}>{snackBarText}</Snackbar>
    </>
  );
};

export default FileUpload;
