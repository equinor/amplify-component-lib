import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';
import { Editor } from '@tiptap/react';

import { MenuButton } from '../MenuButton';

/* v8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
export const TableDelete: FC<{ editor: Editor }> = ({ editor }) => {
  const onRemoveTable = () => editor.chain().focus().deleteTable().run();
  return (
    <MenuButton
      active
      data-testid="remove-table"
      tooltip="Remove table"
      icon={table_chart}
      onClick={onRemoveTable}
    />
  );
};
/* v8 ignore end */
