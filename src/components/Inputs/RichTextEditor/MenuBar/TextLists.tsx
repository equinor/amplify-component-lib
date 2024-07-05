import { FC } from 'react';

import { format_list_bulleted, format_list_numbered } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

const TextLists: FC<EditorPanel> = ({ editor, features }) => {
  /* c8 ignore start */ // Testing tese lines would just be testing the tiptap library or testing that JavaScript works. Theres not enough custom logic here to warrant the maintance cost
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  if (features && !features.includes(RichTextEditorFeatures.LISTS)) return;
  /* c8 ignore end */
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
