import { FC } from 'react';

import { code } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

const TextCode: FC<EditorPanel> = ({ editor, features }) => {
  /* c8 ignore start */ // Testing these lines would just be testing the tiptap library or testing that JavaScript works. Theres not enough custom logic here to warrant the maintance cost
  const toggleCode = () => editor.chain().focus().toggleCodeBlock().run();
  if (features && !features.includes(RichTextEditorFeatures.CODE)) return;
  /* c8 ignore end */
  return (
    <EditorMenu.Button
      active={editor.isActive('codeBlock')}
      icon={code}
      onClick={toggleCode}
    />
  );
};

export { TextCode };
