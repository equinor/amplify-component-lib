import { FC, HTMLAttributes, useEffect, useRef } from 'react';

import { Editor, Extensions, useEditor } from '@tiptap/react';

import { RichText } from 'src/molecules';

export interface RichTextDisplayProps {
  value: string | null | undefined;
  imgReadToken?: string;
  lightBackground?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  extensions?: Extensions;
  children?: (editor: Editor) => JSX.Element;
}

export const RichTextDisplay: FC<
  RichTextDisplayProps & HTMLAttributes<HTMLDivElement>
> = ({
  value,
  imgReadToken,
  lightBackground = true,
  padding = 'md',
  extensions = [RichText.Kit],
  children,
  ...rest
}) => {
  const editor = useEditor({
    extensions: extensions,
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

  /* c8 ignore next */
  if (!editor) return null;
  /* c8 ignore next */
  if (children) return children(editor);
  return (
    <RichText.Styling
      $lightBackground={lightBackground}
      $padding={padding}
      {...rest}
    >
      <RichText.Content editor={editor} readOnly />
    </RichText.Styling>
  );
};
