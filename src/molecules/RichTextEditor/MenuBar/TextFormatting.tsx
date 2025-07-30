import { FC } from 'react';

import { format_bold, format_italics } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextFormatting: FC<EditorPanel> = ({ editor, features }) => {
  /* v8 ignore next 2 */
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  if (features && !features.includes(RichTextEditorFeatures.FORMATTING)) return;

  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        active={editor.isActive('bold')}
        data-testid="bold-button"
        icon={format_bold}
        onClick={toggleBold}
        tooltip="Bold"
      />
      <EditorMenu.Button
        active={editor.isActive('italic')}
        data-testid="italic-button"
        icon={format_italics}
        onClick={toggleItalic}
        tooltip="Italic"
      />
    </EditorMenu.Section>
  );
};
