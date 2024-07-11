import { FC } from 'react';

import { table_chart } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useCurrentEditor } from '@tiptap/react';

import {
  amplify_table_add_column_left,
  amplify_table_add_column_right,
  amplify_table_add_row_above,
  amplify_table_add_row_below,
  amplify_table_column_heading,
  amplify_table_merge_cells,
  amplify_table_remove_column,
  amplify_table_remove_row,
  amplify_table_row_heading,
  amplify_table_split_cell,
} from 'src/atoms/icons';
import { Section } from 'src/molecules/RichTextEditor/MenuBar/MenuBar.styles';
import MenuButton from 'src/molecules/RichTextEditor/MenuBar/MenuButton';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.small};
  padding: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

/* c8 ignore start */
const TableBar: FC = () => {
  const { editor } = useCurrentEditor();

  const onRemoveTable = () => editor?.chain().focus().deleteTable().run();
  const onHeaderRow = () => editor?.chain().focus().toggleHeaderRow().run();
  const onHeaderColumn = () =>
    editor?.chain().focus().toggleHeaderColumn().run();
  const onAddColumnLeft = () => editor?.chain().focus().addColumnBefore().run();
  const onAddColumnRight = () => editor?.chain().focus().addColumnAfter().run();
  const onRemoveColumn = () => editor?.chain().focus().deleteColumn().run();
  const onAddRowBelow = () => editor?.chain().focus().addRowAfter().run();
  const onAddRowAbove = () => editor?.chain().focus().addRowBefore().run();
  const onRemoveRow = () => editor?.chain().focus().deleteRow().run();
  const onMergeCells = () => editor?.chain().focus().mergeCells().run();
  const onSplitCell = () => editor?.chain().focus().splitCell().run();

  return (
    <Container>
      <MenuButton
        tooltip="Remove table"
        active
        icon={table_chart}
        onClick={onRemoveTable}
      />
      <Section>
        <MenuButton
          tooltip="Toggle header row"
          icon={amplify_table_row_heading}
          onClick={onHeaderRow}
          disabled={!editor?.can().toggleHeaderRow()}
        />
        <MenuButton
          tooltip="Toggle header column"
          icon={amplify_table_column_heading}
          onClick={onHeaderColumn}
          disabled={!editor?.can().toggleHeaderColumn()}
        />
      </Section>
      <Section>
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
      </Section>
      <Section>
        <MenuButton
          tooltip="Add row below"
          icon={amplify_table_add_row_below}
          onClick={onAddRowBelow}
          disabled={!editor?.can().addRowAfter()}
        />
        <MenuButton
          tooltip="Add row above"
          icon={amplify_table_add_row_above}
          onClick={onAddRowAbove}
          disabled={!editor?.can().addRowBefore()}
        />
        <MenuButton
          tooltip="Remove row"
          icon={amplify_table_remove_row}
          onClick={onRemoveRow}
          disabled={!editor?.can().deleteRow()}
        />
      </Section>
      <Section>
        <MenuButton
          tooltip="Merge selected cells"
          icon={amplify_table_merge_cells}
          onClick={onMergeCells}
          disabled={!editor?.can().mergeCells()}
        />
        <MenuButton
          tooltip="Split selected cell"
          icon={amplify_table_split_cell}
          onClick={onSplitCell}
          disabled={!editor?.can().splitCell()}
        />
      </Section>
    </Container>
  );
};
/* c8 ignore end */

export default TableBar;
