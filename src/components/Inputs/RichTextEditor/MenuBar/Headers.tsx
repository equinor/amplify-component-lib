import { FC } from 'react';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';
import { amplify_h2, amplify_h3 } from 'src/components/Icons/AmplifyIcons';

const TextHeaders: FC<EditorPanel> = ({ editor, features }) => {
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  if (features && !features.includes(RichTextEditorFeatures.HEADERS)) return;
  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        active={editor.isActive('heading', { level: 2 })}
        icon={amplify_h2}
        onClick={toggleH2}
      />
      <EditorMenu.Button
        active={editor.isActive('heading', { level: 3 })}
        icon={amplify_h3}
        onClick={toggleH3}
      />
    </EditorMenu.Section>
  );
};

export { TextHeaders };
