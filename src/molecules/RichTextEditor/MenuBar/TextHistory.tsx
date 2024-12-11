import { FC } from 'react';

import { redo, undo } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

export const TextHistory: FC<EditorPanel> = ({ editor, features }) => {
  /* v8 ignore start */ // Testing these lines would just be testing the tiptap library or testing that JavaScript works. Theres not enough custom logic here to warrant the maintance cost
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  if (features && !features.includes(RichTextEditorFeatures.HISTORY)) return;
  /* v8 ignore end */
  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        icon={undo}
        onClick={onUndo}
        disabled={!editor.can().undo()}
      />
      <EditorMenu.Button
        icon={redo}
        onClick={onRedo}
        disabled={!editor.can().redo()}
      />
    </EditorMenu.Section>
  );
};
