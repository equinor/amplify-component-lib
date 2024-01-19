import { FC } from 'react';

import {
  code,
  format_align_center,
  format_align_left,
  format_align_right,
  format_bold,
  format_clear,
  format_italics,
  format_list_bulleted,
  format_list_numbered,
  redo,
  table_chart,
  undo,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useCurrentEditor } from '@tiptap/react';

import { RichTextEditorFeatures } from '../RichTextEditor.types';
import AddImage from './AddImage';
import Links from './Links';
import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';
import TableBar from './TableBar';
import TextColor from './TextColor';
import { amplify_h2, amplify_h3 } from 'src/components/Icons/AmplifyIcons';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.comfortable.small};
  padding: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

const Divider = styled.hr`
  width: 1px;
  background: ${colors.ui.background__medium.rgba};
`;

interface MenuBarProps {
  features: RichTextEditorFeatures[];
  toggleTableBorders: () => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const MenuBar: FC<MenuBarProps> = ({
  features,
  toggleTableBorders,
  onImageUpload,
}) => {
  const { editor } = useCurrentEditor();

  /* c8 ignore start */
  if (!editor) {
    throw new Error("Couldn't find tiptap editor context!");
  }
  /* c8 ignore end */

  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleCode = () => editor.chain().focus().toggleCodeBlock().run();
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  const clearFormatting = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  const createTable = () =>
    editor
      .chain()
      .focus()
      .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
      .run();

  return (
    <Wrapper>
      <Container>
        {features.includes(RichTextEditorFeatures.HISTORY) && (
          <Section>
            <MenuButton
              icon={undo}
              onClick={onUndo}
              disabled={!editor.can().undo()}
            />
            <MenuButton
              icon={redo}
              onClick={onRedo}
              disabled={!editor.can().redo()}
            />
          </Section>
        )}
        {features.includes(RichTextEditorFeatures.FORMATTING) && (
          <Section>
            <MenuButton
              active={editor.isActive('bold')}
              icon={format_bold}
              onClick={toggleBold}
            />
            <MenuButton
              active={editor.isActive('italic')}
              icon={format_italics}
              onClick={toggleItalic}
            />
          </Section>
        )}
        {features.includes(RichTextEditorFeatures.HEADERS) && (
          <Section>
            <MenuButton
              active={editor.isActive('heading', { level: 2 })}
              icon={amplify_h2}
              onClick={toggleH2}
            />
            <MenuButton
              active={editor.isActive('heading', { level: 3 })}
              icon={amplify_h3}
              onClick={toggleH3}
            />
          </Section>
        )}
        {features.includes(RichTextEditorFeatures.LISTS) && (
          <Section>
            <MenuButton
              active={editor.isActive('bulletList')}
              icon={format_list_bulleted}
              onClick={toggleBulletList}
            />
            <MenuButton
              active={editor.isActive('orderedList')}
              icon={format_list_numbered}
              onClick={toggleOrderedList}
            />
          </Section>
        )}
        {features.includes(RichTextEditorFeatures.TEXT_COLOR) && <TextColor />}
        {features.includes(RichTextEditorFeatures.CODE) && (
          <MenuButton
            active={editor.isActive('codeBlock')}
            icon={code}
            onClick={toggleCode}
          />
        )}
        {features.includes(RichTextEditorFeatures.ALIGNMENT) && (
          <Section>
            <MenuButton
              active={editor.isActive({ textAlign: 'left' })}
              icon={format_align_left}
              onClick={alignLeft}
            />
            <MenuButton
              active={editor.isActive({ textAlign: 'center' })}
              icon={format_align_center}
              onClick={alignCenter}
            />
            <MenuButton
              active={editor.isActive({ textAlign: 'right' })}
              icon={format_align_right}
              onClick={alignRight}
            />
          </Section>
        )}
        {features.includes(RichTextEditorFeatures.LINKS) && <Links />}
        {features.includes(RichTextEditorFeatures.IMAGES) && onImageUpload && (
          <AddImage onImageUpload={onImageUpload} />
        )}
        {features.includes(RichTextEditorFeatures.TABLE) &&
          !editor.isActive('table') && (
            <MenuButton icon={table_chart} onClick={createTable} />
          )}
        {features.includes(RichTextEditorFeatures.CLEAR_FORMATTING) && (
          <>
            <Divider />
            <MenuButton
              icon={format_clear}
              onClick={clearFormatting}
              customColors={{
                resting: colors.interactive.warning__resting.rgba,
                hover: colors.interactive.warning__hover.rgba,
                backgroundHover: colors.ui.background__warning.rgba,
              }}
            />
          </>
        )}
      </Container>
      {editor.isActive('table') && (
        <TableBar toggleTableBorders={toggleTableBorders} />
      )}
    </Wrapper>
  );
};

export default MenuBar;
