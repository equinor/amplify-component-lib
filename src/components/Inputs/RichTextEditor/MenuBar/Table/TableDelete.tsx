import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';
import { Editor } from '@tiptap/react';

import MenuButton from '../MenuButton';

export const TableDelete: FC<{ editor: Editor }> = ({ editor }) => {
  const onRemoveTable = () => editor?.chain().focus().deleteTable().run();
  return (
    <MenuButton
      tooltip="Remove table"
      active
      icon={table_chart}
      onClick={onRemoveTable}
    />
  );
};
