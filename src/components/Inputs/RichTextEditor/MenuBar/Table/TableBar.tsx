import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { MenuBar } from '../MenuBar';
import { TableDelete } from './TableDelete';
import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';
import { TableMerge } from './TableMerge';
import { ToggleTable } from './ToggleTable';

export const TableMenuBar: FC<{ editor: Editor }> = ({ editor }) => {
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
