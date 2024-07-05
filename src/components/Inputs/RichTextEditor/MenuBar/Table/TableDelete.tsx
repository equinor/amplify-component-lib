import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';
import { Editor } from '@tiptap/react';

import MenuButton from '../MenuButton';

export const TableDelete: FC<{ editor: Editor }> = ({ editor }) => {
  /* c8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
  const onRemoveTable = () => editor.chain().focus().deleteTable().run();
  /* c8 ignore end */
  return (
    <MenuButton
      tooltip="Remove table"
      active
      icon={table_chart}
      onClick={onRemoveTable}
    />
  );
};
