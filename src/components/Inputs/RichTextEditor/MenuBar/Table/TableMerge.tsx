import { FC } from 'react';

import { Editor } from '@tiptap/react';

import {
  amplify_table_merge_cells,
  amplify_table_split_cell,
} from '../../../../Icons/AmplifyIcons';
import { MenuSection } from '../MenuBar.styles';
import MenuButton from '../MenuButton';

export const TableMerge: FC<{ editor: Editor }> = ({ editor }) => {
  /* c8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
  const onMergeCells = () => editor.chain().focus().mergeCells().run();
  const onSplitCell = () => editor.chain().focus().splitCell().run();
  /* c8 ignore end */
  return (
    <MenuSection>
      <MenuButton
        tooltip="Merge selected cells"
        icon={amplify_table_merge_cells}
        onClick={onMergeCells}
        disabled={!editor.can().mergeCells()}
      />
      <MenuButton
        tooltip="Split selected cell"
        icon={amplify_table_split_cell}
        onClick={onSplitCell}
        disabled={!editor.can().splitCell()}
      />
    </MenuSection>
  );
};
