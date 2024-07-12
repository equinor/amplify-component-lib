import { FC, useEffect, useRef } from 'react';

import { useEditor } from '@tiptap/react';

import { RichText } from 'src/molecules/RichTextEditor/RichTextEditor';

export interface RichTextDisplayProps {
  value: string | null | undefined;
  imgReadToken?: string;
  lightBackground?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export const RichTextDisplay: FC<RichTextDisplayProps> = ({
  value,
  imgReadToken,
  lightBackground = true,
  padding = 'md',
}) => {
  const editor = useEditor({
    extensions: [RichText.Kit],
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

  return (
    <RichText.Styling $lightBackground={lightBackground} $padding={padding}>
      <RichText.Content editor={editor} readOnly />
    </RichText.Styling>
  );
};
