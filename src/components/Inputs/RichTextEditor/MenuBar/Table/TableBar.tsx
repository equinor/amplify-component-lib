import { FC } from 'react';

import { Editor } from '@tiptap/react';

import { EditorMenu } from '../MenuBar';
import { TableColumn } from './TableColumn';
import { TableDelete } from './TableDelete';
import { TableMerge } from './TableMerge';
import { TableRow } from './TableRow';
import { ToggleTable } from './ToggleTable';

const TableMenuBar: FC<{ editor: Editor }> = ({ editor }) => {
  /* c8 ignore start */
  if (!editor.isActive('table')) return null;
  /* c8 ignore end */
  return (
    <EditorMenu.Bar>
      <TableDelete editor={editor} />
      <ToggleTable editor={editor} />
      <TableColumn editor={editor} />
      <TableRow editor={editor} />
      <TableMerge editor={editor} />
    </EditorMenu.Bar>
  );
};

const TextTable = {
  delete: TableDelete,
  toggle: ToggleTable,
  column: TableColumn,
  row: TableRow,
  merge: TableMerge,
};

export { TextTable };
export default TableMenuBar;
