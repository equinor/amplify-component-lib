import { FC } from 'react';

import { brush } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextHighlight: FC<EditorPanel> = ({ editor, features }) => {
  if (features && !features.includes(RichTextEditorFeatures.HIGHLIGHT))
    return null;

  return (
    <EditorMenu.Button
      active={editor.isActive('highlight')}
      icon={brush}
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      data-testid="highlight-button"
      tooltip="Highlight"
    />
  );
};
