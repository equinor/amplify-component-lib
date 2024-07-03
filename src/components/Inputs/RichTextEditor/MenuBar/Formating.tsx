import { format_bold, format_italics } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';

const Formating = ({ editor, features }: EditorPanel) => {
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  if (!features.includes(RichTextEditorFeatures.FORMATTING)) return;
  return (
    <Section>
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
    </Section>
  );
};

export { Formating };
