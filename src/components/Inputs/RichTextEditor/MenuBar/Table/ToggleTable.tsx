import { FC } from 'react';

import { Editor } from '@tiptap/react';

import {
  amplify_table_column_heading,
  amplify_table_row_heading,
} from '../../../../Icons/AmplifyIcons';
import { MenuSection } from '../MenuBar.styles';
import MenuButton from '../MenuButton';

/* c8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
export const ToggleTable: FC<{ editor: Editor }> = ({ editor }) => {
  const onHeaderRow = () => editor.chain().focus().toggleHeaderRow().run();
  const onHeaderColumn = () =>
    editor.chain().focus().toggleHeaderColumn().run();
  return (
    <MenuSection>
      <MenuButton
        tooltip="Toggle header row"
        icon={amplify_table_row_heading}
        onClick={onHeaderRow}
        disabled={!editor.can().toggleHeaderRow()}
      />
      <MenuButton
        tooltip="Toggle header column"
        icon={amplify_table_column_heading}
        onClick={onHeaderColumn}
        disabled={!editor.can().toggleHeaderColumn()}
      />
    </MenuSection>
  );
};
/* c8 ignore end */
