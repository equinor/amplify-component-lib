import { ChangeEvent, FC, useRef } from 'react';

import { camera_add_photo } from '@equinor/eds-icons';

import { EditorMenu } from './MenuBar';
import {
  EditorPanel,
  OnImageUploadFn,
  RichTextEditorFeatures,
} from 'src/components/Inputs/RichTextEditor/RichTextEditor.types';
interface AddImageProps extends EditorPanel {
  onImageUpload?: OnImageUploadFn;
}

const AddImageButton: FC<AddImageProps> = ({
  onImageUpload,
  editor,
  features,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  if (!onImageUpload) return null;
  if (features && !features.includes(RichTextEditorFeatures.IMAGES))
    return null;

  const showFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    /* c8 ignore start */
    if (!files?.[0]) {
      console.error('Files undefined');
      return;
    }

    const image = await onImageUpload(files[0]);
    if (!image) return;
    /* c8 ignore end */

    editor?.chain().focus().setImage({ src: image.b64, alt: image.url }).run();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id="img-input"
        multiple={false}
        onChange={handleOnFileSelect}
        style={{ display: 'none' }}
        accept="image/*, video/*"
      />
      <EditorMenu.Button icon={camera_add_photo} onClick={showFileDialog} />
    </>
  );
};

export type { AddImageProps };
export { AddImageButton };
