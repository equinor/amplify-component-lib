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

export const createFileFromDataUrl = (dataUrl: string, fileName: string) => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  if (!mimeMatch) return null;

  const byteString = atob(arr[arr.length - 1]);
  let n = byteString.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = byteString.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mimeMatch[1] });
};

export const replaceTrackedImage = (
  images: string[],
  oldSrc: string,
  newSrc: string
) =>
  images.map((image) => {
    if (image !== oldSrc) return image;
    return newSrc;
  });

/** Replaces matching image src values in the editor document. */
export const replaceImageSrcInEditor = (
  editor: Editor,
  oldSrc: string,
  newSrc: string,
  alt?: string
) => {
  if (oldSrc === newSrc) return;

  let transaction = editor.state.tr;
  let hasUpdates = false;

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'image' && node.attrs.src === oldSrc) {
      transaction = transaction.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        src: newSrc,
        alt: alt ?? node.attrs.alt,
      });
      hasUpdates = true;
    }
  });

  if (hasUpdates) {
    editor.view.dispatch(transaction);
  }
};

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
  const isCheckingImages = useRef(false);
  const needsRecheck = useRef(false);

  const uploadAndReplaceImage = async (editor: Editor, image: string) => {
    try {
      const dataUrl = queryClient.getQueryData<string>([image]);
      if (!dataUrl) return;

      const file = createFileFromDataUrl(dataUrl, image);
      if (!file) return;

      const uploadedImage = await onImageUpload?.(file);
      if (!uploadedImage?.src) return;

      queryClient.setQueryData([uploadedImage.src], dataUrl);

      addedImages.current = replaceTrackedImage(
        addedImages.current,
        image,
        uploadedImage.src
      );

      replaceImageSrcInEditor(
        editor,
        image,
        uploadedImage.src,
        uploadedImage.alt
      );
    } catch (error) {
      console.error('Failed to upload and replace image:', error);
    }
  };

  /* v8 ignore start */
  const handleImageCheck = async (editor: Editor) => {
    // Skip if a check is already in progress to prevent race conditions. Mark that a recheck is needed so changes made during the current check are not dropped.
    if (isCheckingImages.current) {
      needsRecheck.current = true;
      return;
    }
    isCheckingImages.current = true;
    needsRecheck.current = false;

    try {
      const currentImages: string[] = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === 'image' && node.attrs.src) {
          currentImages.push(node.attrs.src);
        }
      });

      const imagesToDelete = addedImages.current.filter(
        (image) =>
          !currentImages.includes(image) &&
          !deletedImages.current.includes(image)
      );

      const newlyAddedImages = currentImages.filter(
        (image) =>
          !addedImages.current.includes(image) &&
          !deletedImages.current.includes(image)
      );

      const recoveredFromUndo = deletedImages.current.filter((image) =>
        currentImages.includes(image)
      );

      const uniqueNewImages = [...new Set(newlyAddedImages)];
      addedImages.current.push(...uniqueNewImages);

      for (const image of recoveredFromUndo) {
        try {
          await uploadAndReplaceImage(editor, image);
        } catch (error) {
          console.error('Failed to recover image from undo:', error);
        }
      }

      if (onImageRemove && imagesToDelete.length > 0) {
        for (const image of imagesToDelete) {
          try {
            await onImageRemove(image);
            deletedImages.current.push(image);
          } catch (error) {
            console.error('Failed to remove image:', error);
          }
        }
      } else if (onRemovedImagesChange && imagesToDelete.length > 0) {
        onRemovedImagesChange(imagesToDelete);
        deletedImages.current.push(...imagesToDelete);
      }

      if (recoveredFromUndo.length > 0) {
        deletedImages.current = deletedImages.current.filter(
          (image) => !recoveredFromUndo.includes(image)
        );
      }
    } finally {
      isCheckingImages.current = false;
      // If another update occurred while this check was running, run again to catch those changes
      if (needsRecheck.current) {
        void handleImageCheck(editor);
      }
    }
  };

  const editor = useEditor({
    content,
    shouldRerenderOnTransaction: true,
    extensions: [ampExtensions, ...extensions],
    onCreate: ({ editor }) => {
      void handleImageCheck(editor);
    },
    onUpdate: ({ editor }) => {
      void handleImageCheck(editor);

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
