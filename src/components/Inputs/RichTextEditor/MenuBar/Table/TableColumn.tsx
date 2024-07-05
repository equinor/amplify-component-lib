import { FC } from 'react';

import { Editor } from '@tiptap/react';

import {
  amplify_table_add_column_left,
  amplify_table_add_column_right,
  amplify_table_remove_column,
} from '../../../../Icons/AmplifyIcons';
import { MenuSection } from '../MenuBar.styles';
import MenuButton from '../MenuButton';

export const TableColumn: FC<{ editor: Editor }> = ({ editor }) => {
  /* c8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
  const onAddColumnLeft = () => editor.chain().focus().addColumnBefore().run();
  const onAddColumnRight = () => editor.chain().focus().addColumnAfter().run();
  const onRemoveColumn = () => editor.chain().focus().deleteColumn().run();
  /* c8 ignore end */
  return (
    <MenuSection>
      <MenuButton
        tooltip="Add column left"
        icon={amplify_table_add_column_left}
        onClick={onAddColumnLeft}
        disabled={!editor.can().addColumnBefore()}
      />
      <MenuButton
        tooltip="Add column right"
        icon={amplify_table_add_column_right}
        onClick={onAddColumnRight}
        disabled={!editor.can().addColumnAfter()}
      />
      <MenuButton
        tooltip="Remove column"
        icon={amplify_table_remove_column}
        onClick={onRemoveColumn}
        disabled={!editor.can().deleteColumn()}
      />
    </MenuSection>
  );
};
