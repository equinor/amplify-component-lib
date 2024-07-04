import { FC } from 'react';
import { format_bold, format_italics } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';

const TextFormating: FC<EditorPanel> = ({ editor, features }) => {
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  if (!features.includes(RichTextEditorFeatures.FORMATTING)) return;
  return (
    <MenuSection>
      <MenuButton
        active={editor.isActive('bold')}
        icon={format_bold}
        onClick={toggleBold}
      />
      <MenuButton
        active={editor.isActive('italic')}
        icon={format_italics}
        onClick={toggleItalic}
      />
    </MenuSection>
  );
};

export { TextFormating };
