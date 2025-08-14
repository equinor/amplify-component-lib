import { FC } from 'react';

import { redo, undo } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextHistory: FC<EditorPanel> = ({ editor, features }) => {
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  if (features && !features.includes(RichTextEditorFeatures.UNDO_REDO)) return;

  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        icon={undo}
        onClick={onUndo}
        data-testid="undo-button"
        disabled={!editor.can().undo()}
        tooltip="Undo"
      />
      <EditorMenu.Button
        icon={redo}
        onClick={onRedo}
        data-testid="redo-button"
        disabled={!editor.can().redo()}
        tooltip="Redo"
      />
    </EditorMenu.Section>
  );
};
