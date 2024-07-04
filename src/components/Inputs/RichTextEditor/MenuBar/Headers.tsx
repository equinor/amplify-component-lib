import { FC } from 'react';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';
import { amplify_h2, amplify_h3 } from 'src/components/Icons/AmplifyIcons';

const TextHeaders: FC<EditorPanel> = ({ editor, features }) => {
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  if (features && !features.includes(RichTextEditorFeatures.HEADERS)) return;
  return (
    <MenuSection>
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
    </MenuSection>
  );
};

export { TextHeaders };
