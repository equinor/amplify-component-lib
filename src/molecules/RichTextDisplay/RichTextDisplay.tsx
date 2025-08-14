import { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

import { Editor, Extensions, useEditor } from '@tiptap/react';

import { useAmplifyKit } from 'src/atoms/hooks/useAmplifyKit';
import {
  EditorContent,
  EditorStyling,
} from 'src/molecules/RichTextEditor/RichTextEditor.styles';
import {
  DEFAULT_FEATURES,
  ImageExtensionFnProps,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

export interface RichTextDisplayProps
  extends Pick<ImageExtensionFnProps, 'onImageRead'> {
  value: string | null | undefined;
  /**
   * @deprecated - Use OnImageRead instead
   */
  imgReadToken?: string;
  lightBackground?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  extensions?: Extensions;
  children?: (editor: Editor) => ReactNode;
}

/**
 *
 * @param value - Rich text content
 * @param imgReadToken - Deprecated, use onImageRead instead
 * @param onImageRead - handler used when loading images, expects b64 string to be returned
 * @param lightBackground - if it should have a light BG color
 * @param padding - padding in the editor
 * @param extensions - additional extensions to be added
 * @param children - render prop for custom rendering, provides editor via callback
 */
export const RichTextDisplay: FC<
  RichTextDisplayProps & HTMLAttributes<HTMLDivElement>
> = ({
  value,
  imgReadToken,
  onImageRead,
  lightBackground = true,
  padding = 'md',
  extensions,
  children,
  ...rest
}) => {
  const defaultExtensions = useAmplifyKit({
    features: DEFAULT_FEATURES,
    onImageRead: onImageRead,
  });
  const editor = useEditor({
    /* v8 ignore next */
    shouldRerenderOnTransaction: true,
    /* v8 ignore next */
    extensions: extensions ? extensions : [defaultExtensions],
    content: imgReadToken
      ? value?.replaceAll(/(<img src=")(.+)("\/>)/g, `$1$2?${imgReadToken}$3`)
      : value,
    editable: false,
  });

  const previousValue = useRef(value);

  useEffect(() => {
    if (editor && value && value !== previousValue.current) {
      editor.commands.setContent(value);
      previousValue.current = value;
    }
  }, [editor, value]);

  /* v8 ignore next */
  if (!editor) return null;
  /* v8 ignore next */
  if (children) return children(editor);
  return (
    <EditorStyling
      $lightBackground={lightBackground}
      $padding={padding}
      {...rest}
    >
      <EditorContent editor={editor} readOnly />
    </EditorStyling>
  );
};
