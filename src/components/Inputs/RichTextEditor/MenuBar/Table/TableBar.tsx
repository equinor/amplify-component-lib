import { FC } from 'react';

import { Editor } from '@tiptap/react';

import { MenuBar } from '../MenuBar';
import { TableColumn } from './TableColumn';
import { TableDelete } from './TableDelete';
import { TableMerge } from './TableMerge';
import { TableRow } from './TableRow';
import { ToggleTable } from './ToggleTable';

const TableMenuBar: FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor.isActive('table')) return null;
  return (
    <MenuBar>
      <TableDelete editor={editor} />
      <ToggleTable editor={editor} />
      <TableColumn editor={editor} />
      <TableRow editor={editor} />
      <TableMerge editor={editor} />
    </MenuBar>
  );
};

export { TableDelete, ToggleTable, TableColumn, TableRow, TableMerge };
export default TableMenuBar;
