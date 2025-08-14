import { FC } from 'react';

import { format_color_fill } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextHighlight: FC<EditorPanel> = ({ editor, features }) => {
  if (features && !features.includes(RichTextEditorFeatures.HIGHLIGHT))
    return null;

  return (
    <EditorMenu.Button
      data-testid="highlight-button"
      active={editor.isActive('highlight')}
      icon={format_color_fill} // A suitable icon for highlighting doesn't exist in EDS, using color fill as a placeholder
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      tooltip="Highlight"
    />
  );
};
