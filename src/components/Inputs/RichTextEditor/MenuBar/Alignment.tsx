import { FC } from 'react';

import {
  format_align_center,
  format_align_left,
  format_align_right,
} from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';

const TextAlignment: FC<EditorPanel> = ({ editor, features }) => {
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  if (features && !features.includes(RichTextEditorFeatures.ALIGNMENT)) return;
  return (
    <MenuSection>
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
    </MenuSection>
  );
};

export { TextAlignment };
