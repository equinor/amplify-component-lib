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
import { Editor } from '@tiptap/react';

import {
  EditorPanel,
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
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
  editor: Editor;
  features: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}

const MenuBar: FC<MenuBarProps> = ({ editor, features, onImageUpload }) => {
  return (
    <Wrapper>
      <Container>
        <History editor={editor} features={features} />
        <Formating editor={editor} features={features} />
        <Headers editor={editor} features={features} />
        <Lists editor={editor} features={features} />
        <TextColor editor={editor} features={features} />
        <Code editor={editor} features={features} />
        <Alignment editor={editor} features={features} />
        <Links editor={editor} features={features} />
        <AddImage
          editor={editor}
          features={features}
          onImageUpload={onImageUpload}
        />
        <Table editor={editor} features={features} />
        <ClearFormating editor={editor} features={features} />
      </Container>
      <TableBar editor={editor} features={features} />
    </Wrapper>
  );
};

const History = ({ editor, features }: EditorPanel) => {
  const onUndo = () => editor.chain().focus().undo().run();
  const onRedo = () => editor.chain().focus().redo().run();
  if (!features.includes(RichTextEditorFeatures.HISTORY)) return;
  return (
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
  );
};

const Formating = ({ editor, features }: EditorPanel) => {
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  if (!features.includes(RichTextEditorFeatures.FORMATTING)) return;
  return (
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
  );
};

const Headers = ({ editor, features }: EditorPanel) => {
  const toggleH2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () =>
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  if (!features.includes(RichTextEditorFeatures.HEADERS)) return;
  return (
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
  );
};

const Lists = ({ editor, features }: EditorPanel) => {
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  if (!features.includes(RichTextEditorFeatures.LISTS)) return;
  return (
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
  );
};

const Code = ({ editor, features }: EditorPanel) => {
  const toggleCode = () => editor.chain().focus().toggleCodeBlock().run();
  if (!features.includes(RichTextEditorFeatures.CODE)) return;
  return (
    <MenuButton
      active={editor.isActive('codeBlock')}
      icon={code}
      onClick={toggleCode}
    />
  );
};

const Alignment = ({ editor, features }: EditorPanel) => {
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  if (!features.includes(RichTextEditorFeatures.ALIGNMENT)) return;
  return (
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
  );
};

const Table = ({ editor, features }: EditorPanel) => {
  const createTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
      .run();
  };
  if (!features.includes(RichTextEditorFeatures.TABLE)) return;
  if (editor.isActive('table')) return;
  return <MenuButton icon={table_chart} onClick={createTable} />;
};

const ClearFormating = ({ editor, features }: EditorPanel) => {
  const clearFormatting = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  if (!features.includes(RichTextEditorFeatures.CLEAR_FORMATTING)) return;
  return (
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
  );
};

export default MenuBar;
