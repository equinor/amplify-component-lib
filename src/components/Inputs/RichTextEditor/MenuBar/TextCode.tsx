import { FC } from 'react';

import { code } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

const TextCode: FC<EditorPanel> = ({ editor, features }) => {
  const toggleCode = () => editor.chain().focus().toggleCodeBlock().run();
  if (features && !features.includes(RichTextEditorFeatures.CODE)) return;
  return (
    <EditorMenu.Button
      active={editor.isActive('codeBlock')}
      icon={code}
      onClick={toggleCode}
    />
  );
};

export { TextCode };
