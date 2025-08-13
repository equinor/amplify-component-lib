import { FC, ReactNode, useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Editor, Extensions, useEditor } from '@tiptap/react';

import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { useAmplifyKit } from 'src/atoms/hooks/useAmplifyKit';

export interface EditorProviderProps extends ImageExtensionFnProps {
  children: (editor: Editor) => ReactNode;
  content: string | null | undefined;
  extensions?: Extensions;
  onUpdate?: (html: string) => void;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
}

export const EditorProvider: FC<EditorProviderProps> = ({
  children,
  content,
  features,
  placeholder,
  onUpdate,
  onImageUpload,
  onImageRead,
  onImageRemove,
  onRemovedImagesChange,
  extensions = [],
}) => {
  // Lets us apply the features API with the new amplify kit
  const ampExtensions = useAmplifyKit({
    features,
    placeholder,
    onImageUpload,
    onImageRead,
  });
  const queryClient = useQueryClient();
  const addedImages = useRef<string[]>([]);
  const deletedImages = useRef<string[]>([]);
  const previousRemovedImages = useRef<string[]>([]);

  /* v8 ignore start */
  const handleImageCheck = (editor: Editor) => {
    const currentImages: string[] = [];

    editor.getJSON().content?.forEach((item) => {
      if (item.type === 'image' && item.attrs?.src) {
        currentImages.push(item.attrs.src);
      }
    });

    for (const image of currentImages) {
      if (!addedImages.current.includes(image)) {
        addedImages.current.push(image);
      } else if (addedImages.current.includes(image) && onImageRemove) {
        // Image was recovered from undo, need to upload it again
        const dataUrl = queryClient.getQueryData<string>([image]);
        if (dataUrl) {
          const arr = dataUrl.split(',');
          const mime = arr[0].match(/:(.*?);/)![1];
          const byteString = atob(arr[arr.length - 1]);
          let n = byteString.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = byteString.charCodeAt(n);
          }
          const file = new File([u8arr], image, { type: mime });
          onImageUpload?.(file);
        }
      }
    }

    const imagesToDelete = addedImages.current.filter(
      (image) =>
        !currentImages.includes(image) && !deletedImages.current.includes(image)
    );

    if (onImageRemove) {
      for (const image of imagesToDelete) {
        onImageRemove?.(image);
        deletedImages.current.push(image);
      }
    }

    if (
      onRemovedImagesChange &&
      previousRemovedImages.current.length !== imagesToDelete.length
    ) {
      onRemovedImagesChange(deletedImages.current);
      previousRemovedImages.current = imagesToDelete;
    }
  };

  const editor = useEditor({
    content,
    shouldRerenderOnTransaction: true,
    extensions: [ampExtensions, ...extensions],
    onCreate: ({ editor }) => {
      handleImageCheck(editor);
    },
    onUpdate: ({ editor }) => {
      handleImageCheck(editor);

      onUpdate?.(editor.getHTML());
    },
  });

  useEffect(() => {
    // This makes Tiptap react to its prop changing from the outside
    // Useful if for instance the content is fetched from an API.
    // This way the editor will update when the content changes
    if (!editor) return;
    if (content === editor.getHTML()) return;
    editor.commands.setContent(content || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  /* v8 ignore stop */

  /* v8 ignore next */
  if (!editor) return null;
  return children(editor);
};
