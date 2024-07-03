import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';
import { amplify_h2, amplify_h3 } from 'src/components/Icons/AmplifyIcons';

const Headers = ({ editor, features }: EditorPanel) => {
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  if (!features.includes(RichTextEditorFeatures.HEADERS)) return;
  return (
    <Section>
      <MenuButton
        active={editor.isActive('heading', { level: 2 })}
        icon={amplify_h2}
        onClick={toggleH2}
      />
      <MenuButton
        active={editor.isActive('heading', { level: 3 })}
        icon={amplify_h3}
        onClick={toggleH3}
      />
    </Section>
  );
};

export { Headers };
