import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';

import {
  EditorPanel,
  RichTextEditorFeatures,
} from '../../RichTextEditor.types';
import { MenuButton } from '../MenuButton';

export const TextTable: FC<EditorPanel> = ({ editor, features }) => {
  /* v8 ignore start */
  if (features && !features.includes(RichTextEditorFeatures.TABLE)) return;
  if (editor.isActive('table')) return;
  /* v8 ignore end */
  return (
    <MenuButton
      data-testid="add-table-button"
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
