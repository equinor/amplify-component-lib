import { FC, useEffect, useRef } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';

import { AmplifyKit } from '../Inputs/RichTextEditor/custom-extensions/DefaultKit';
import { EditorStyling } from '../Inputs/RichTextEditor/RichTextEditor.styles';

export interface RichTextDisplayProps {
  value: string | null | undefined;
  imgReadToken?: string;
  lightBackground?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const RichTextDisplay: FC<RichTextDisplayProps> = ({
  value,
  imgReadToken,
  lightBackground = true,
  padding = 'md',
}) => {
  const editor = useEditor({
    extensions: [AmplifyKit],
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
    <EditorStyling $lightBackground={lightBackground} $padding={padding}>
      <EditorContent editor={editor} readOnly />
    </EditorStyling>
  );
};

export default RichTextDisplay;
