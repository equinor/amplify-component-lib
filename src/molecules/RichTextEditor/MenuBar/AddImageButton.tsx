import { ChangeEvent, FC, useRef } from 'react';

import { camera_add_photo } from '@equinor/eds-icons';

import { EditorMenu } from './MenuBar';
import {
  EditorPanel,
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

export interface AddImageProps
  extends EditorPanel,
    Pick<ImageExtensionFnProps, 'onImageUpload'> {}

export const AddImageButton: FC<AddImageProps> = ({
  onImageUpload,
  editor,
  features,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (features && !features.includes(RichTextEditorFeatures.IMAGES))
    return null;

  const showFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.[0]) {
      console.error('Files undefined');
      return;
    }

    const image = await onImageUpload?.(files[0]);
    /* v8 ignore next */
    if (!image) return;

    editor?.chain().focus().setImage({ src: image.src, alt: image.alt }).run();
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
      <EditorMenu.Button
        data-testid="add-image-button"
        icon={camera_add_photo}
        onClick={showFileDialog}
        tooltip="Add Image"
      />
    </>
  );
};
