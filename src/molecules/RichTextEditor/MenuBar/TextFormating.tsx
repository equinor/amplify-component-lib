import { FC } from 'react';

import { format_bold, format_italics } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextFormating: FC<EditorPanel> = ({ editor, features }) => {
  /* v8 ignore start */ // Testing these lines would just be testing the tiptap library or testing that JavaScript works. Theres not enough custom logic here to warrant the maintance cost
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  if (features && !features.includes(RichTextEditorFeatures.FORMATTING)) return;
  /* v8 ignore end */
  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        active={editor.isActive('bold')}
        icon={format_bold}
        onClick={toggleBold}
      />
      <EditorMenu.Button
        active={editor.isActive('italic')}
        icon={format_italics}
        onClick={toggleItalic}
      />
    </EditorMenu.Section>
  );
};
