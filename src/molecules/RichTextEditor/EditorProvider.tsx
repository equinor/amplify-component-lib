import { FC, useEffect, useRef } from 'react';

import { Editor, Extensions, useEditor } from '@tiptap/react';

import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { useAmplifyKit } from 'src/atoms/hooks/useAmplifyKit';

export interface EditorProviderProps extends ImageExtensionFnProps {
  children: (editor: Editor) => JSX.Element;
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
  const addedImages = useRef<string[]>([]);
  const previousRemovedImages = useRef<string[]>([]);

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
      }
    }

    // TODO: Test this when we move to browser mode
    /* c8 ignore start */
    const removedImages = addedImages.current.filter(
      (image) => !currentImages.includes(image)
    );
    if (
      previousRemovedImages.current.some(
        (image) => !removedImages.includes(image)
      ) ||
      removedImages.some(
        (image) => !previousRemovedImages.current.includes(image)
      )
    ) {
      onRemovedImagesChange?.(removedImages);
      previousRemovedImages.current = removedImages;
    }
    /* c8 ignore end */
  };

  const editor = useEditor({
    content,
    extensions: [ampExtensions, ...extensions],
    onCreate: ({ editor }) => {
      handleImageCheck(editor);
    },
    onUpdate: ({ editor }) => {
      handleImageCheck(editor);

      onUpdate?.(editor.getHTML());
    },
  });

  /* c8 ignore start */
  useEffect(() => {
    // This makes Tiptap react to its prop changing from the outside
    // Usefull if for instance the content is fetched from an API.
    // This way the editor will update when the content changes
    if (!editor) return;
    if (content === editor.getHTML()) return;
    editor.commands.setContent(content || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  /* c8 ignore stop */

  /* c8 ignore next */
  if (!editor) return null;
  return children(editor);
};
