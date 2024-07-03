import { table_chart } from '@equinor/eds-icons';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import MenuButton from './MenuButton';

const Table = ({ editor, features }: EditorPanel) => {
  const createTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
      .run();
  };
  if (!features.includes(RichTextEditorFeatures.TABLE)) return;
  if (editor.isActive('table')) return;
  return <MenuButton icon={table_chart} onClick={createTable} />;
};

export { Table };
