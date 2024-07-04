import { FC } from 'react';
import { redo, undo } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';

const TextHistory: FC<EditorPanel> = ({ editor, features }) => {
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  if (!features.includes(RichTextEditorFeatures.HISTORY)) return;
  return (
    <MenuSection>
      <MenuButton
        icon={undo}
        onClick={onUndo}
        disabled={!editor.can().undo()}
      />
      <MenuButton
        icon={redo}
        onClick={onRedo}
        disabled={!editor.can().redo()}
      />
    </MenuSection>
  );
};

export { TextHistory };
