import { FC } from 'react';

import { Editor } from '@tiptap/react';

import { MenuSection } from '../MenuBar.styles';
import { MenuButton } from '../MenuButton';
import {
  amplify_table_add_row_above,
  amplify_table_add_row_below,
  amplify_table_remove_row,
} from 'src/atoms/icons/wysiwyg';

/* v8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
export const TableRow: FC<{ editor: Editor }> = ({ editor }) => {
  const onAddRowBelow = () => editor.chain().focus().addRowAfter().run();
  const onAddRowAbove = () => editor.chain().focus().addRowBefore().run();
  const onRemoveRow = () => editor.chain().focus().deleteRow().run();
  return (
    <MenuSection>
      <MenuButton
        tooltip="Add row below"
        icon={amplify_table_add_row_below}
        onClick={onAddRowBelow}
        disabled={!editor.can().addRowAfter()}
      />
      <MenuButton
        tooltip="Add row above"
        icon={amplify_table_add_row_above}
        onClick={onAddRowAbove}
        disabled={!editor.can().addRowBefore()}
      />
      <MenuButton
        tooltip="Remove row"
        icon={amplify_table_remove_row}
        onClick={onRemoveRow}
        disabled={!editor.can().deleteRow()}
      />
    </MenuSection>
  );
};
/* v8 ignore end */
