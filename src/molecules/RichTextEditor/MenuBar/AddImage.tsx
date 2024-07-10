import { ChangeEvent, FC, useRef } from 'react';

import { camera_add_photo } from '@equinor/eds-icons';
import { useCurrentEditor } from '@tiptap/react';

import MenuButton from 'src/molecules/RichTextEditor/MenuBar/MenuButton';
import { OnImageUploadFn } from 'src/molecules/RichTextEditor/RichTextEditor.types';

interface AddImageProps {
  onImageUpload: OnImageUploadFn;
}

const AddImage: FC<AddImageProps> = ({ onImageUpload }) => {
  const { editor } = useCurrentEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    /* c8 ignore end */

    const image = await onImageUpload(files[0]);

    if (!image) return;

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
      <MenuButton icon={camera_add_photo} onClick={showFileDialog} />
    </>
  );
};

export default AddImage;
