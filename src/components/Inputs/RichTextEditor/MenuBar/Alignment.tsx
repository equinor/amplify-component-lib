import {
  format_align_center,
  format_align_left,
  format_align_right,
} from '@equinor/eds-icons';
import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';

const Alignment = ({ editor, features }: EditorPanel) => {
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  if (!features.includes(RichTextEditorFeatures.ALIGNMENT)) return;
  return (
    <Section>
      <MenuButton
        active={editor.isActive({ textAlign: 'left' })}
        icon={format_align_left}
        onClick={alignLeft}
      />
      <MenuButton
        active={editor.isActive({ textAlign: 'center' })}
        icon={format_align_center}
        onClick={alignCenter}
      />
      <MenuButton
        active={editor.isActive({ textAlign: 'right' })}
        icon={format_align_right}
        onClick={alignRight}
      />
    </Section>
  );
};

export { Alignment };
