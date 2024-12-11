import { FC } from 'react';

import { Editor } from '@tiptap/react';

import { MenuSection } from '../MenuBar.styles';
import { MenuButton } from '../MenuButton';
import {
  amplify_table_merge_cells,
  amplify_table_split_cell,
} from 'src/atoms/icons/wysiwyg';

/* v8 ignore start */ // There is no custom logic here. Testing these actions would just be us testing the tiptap library.
export const TableMerge: FC<{ editor: Editor }> = ({ editor }) => {
  const onMergeCells = () => editor.chain().focus().mergeCells().run();
  const onSplitCell = () => editor.chain().focus().splitCell().run();
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
/* v8 ignore end */
