import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';

import {
  EditorPanel,
  RichTextEditorFeatures,
} from '../../RichTextEditor.types';
import MenuButton from '../MenuButton';

const TextTable: FC<EditorPanel> = ({ editor, features }) => {
  /* c8 ignore start */
  if (features && !features.includes(RichTextEditorFeatures.TABLE)) return;
  if (editor.isActive('table')) return;
  /* c8 ignore end */
  return (
    <MenuButton
      icon={table_chart}
      onClick={() => {
        editor
          .chain()
          .focus()
          .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
          .run();
      }}
    />
  );
};

export { TextTable };
