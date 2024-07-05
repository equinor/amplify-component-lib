import { FC } from 'react';

import { format_list_bulleted, format_list_numbered } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

const TextLists: FC<EditorPanel> = ({ editor, features }) => {
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  if (features && !features.includes(RichTextEditorFeatures.LISTS)) return;
  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        active={editor.isActive('bulletList')}
        icon={format_list_bulleted}
        onClick={toggleBulletList}
      />
      <EditorMenu.Button
        active={editor.isActive('orderedList')}
        icon={format_list_numbered}
        onClick={toggleOrderedList}
      />
    </EditorMenu.Section>
  );
};

export { TextLists };
