import { FC } from 'react';

import {
  format_align_center,
  format_align_left,
  format_align_right,
} from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

const TextAlignment: FC<EditorPanel> = ({ editor, features }) => {
  /* c8 ignore start */ // Testing tese lines would just be testing the tiptap library or testing that JavaScript works. Theres not enough custom logic here to warrant the maintance cost
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  if (features && !features.includes(RichTextEditorFeatures.ALIGNMENT)) return;
  /* c8 ignore end */
  return (
    <EditorMenu.Section>
      <EditorMenu.Button
        active={editor.isActive({ textAlign: 'left' })}
        icon={format_align_left}
        onClick={alignLeft}
      />
      <EditorMenu.Button
        active={editor.isActive({ textAlign: 'center' })}
        icon={format_align_center}
        onClick={alignCenter}
      />
      <EditorMenu.Button
        active={editor.isActive({ textAlign: 'right' })}
        icon={format_align_right}
        onClick={alignRight}
      />
    </EditorMenu.Section>
  );
};

export { TextAlignment };
