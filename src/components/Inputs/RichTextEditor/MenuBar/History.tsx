import { redo, undo } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';

const History = ({ editor, features }: EditorPanel) => {
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  if (!features.includes(RichTextEditorFeatures.HISTORY)) return;
  return (
    <Section>
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
    </Section>
  );
};

export { History };
