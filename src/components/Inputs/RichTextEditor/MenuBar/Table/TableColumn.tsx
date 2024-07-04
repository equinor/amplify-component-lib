import { FC } from 'react';

import {
  amplify_table_add_column_left,
  amplify_table_add_column_right,
  amplify_table_remove_column,
} from '../../../../Icons/AmplifyIcons';
import { MenuSection } from '../MenuBar.styles';
import MenuButton from '../MenuButton';
import { Editor } from '@tiptap/react';

export const TableColumn: FC<{ editor: Editor }> = ({ editor }) => {
  const onAddColumnLeft = () => editor?.chain().focus().addColumnBefore().run();
  const onAddColumnRight = () => editor?.chain().focus().addColumnAfter().run();
  const onRemoveColumn = () => editor?.chain().focus().deleteColumn().run();
  return (
    <MenuSection>
      <MenuButton
        tooltip="Add column left"
        icon={amplify_table_add_column_left}
        onClick={onAddColumnLeft}
        disabled={!editor?.can().addColumnBefore()}
      />
      <MenuButton
        tooltip="Add column right"
        icon={amplify_table_add_column_right}
        onClick={onAddColumnRight}
        disabled={!editor?.can().addColumnAfter()}
      />
      <MenuButton
        tooltip="Remove column"
        icon={amplify_table_remove_column}
        onClick={onRemoveColumn}
        disabled={!editor?.can().deleteColumn()}
      />
    </MenuSection>
  );
};
