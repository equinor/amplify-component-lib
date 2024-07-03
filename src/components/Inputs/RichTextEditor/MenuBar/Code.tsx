import { code } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import MenuButton from './MenuButton';

const Code = ({ editor, features }: EditorPanel) => {
  const toggleCode = () => editor.chain().focus().toggleCodeBlock().run();
  if (!features.includes(RichTextEditorFeatures.CODE)) return;
  return (
    <MenuButton
      active={editor.isActive('codeBlock')}
      icon={code}
      onClick={toggleCode}
    />
  );
};

export { Code };
