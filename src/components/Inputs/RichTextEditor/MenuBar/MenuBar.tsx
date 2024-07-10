import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { Editor } from '@tiptap/react';

import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
import { TextTable } from './Table/Table';
import TableMenuBar from './Table/TableBar';
import { AddImageButton } from './AddImageButton';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';
import { TextAlignment } from './TextAlignment';
import { TextClearFormating } from './TextClearFormating';
import { TextCode } from './TextCode';
import { TextColor } from './TextColor';
import { TextFormating } from './TextFormating';
import { TextHeaders } from './TextHeaders';
import { TextHistory } from './TextHistory';
import { TextLinks } from './TextLinks';
import { TextLists } from './TextLists';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const MenuBars = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.comfortable.small};
  padding: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

interface MenuBarProps {
  editor: Editor;
  features: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}

/* c8 ignore start */
const AmplifyBar: FC<MenuBarProps> = ({ editor, features, onImageUpload }) => {
  if (features.length === 0) return null;
  return (
    <MenuBars>
      {/* Main Bar */}
      <MenuBar>
        <TextHistory editor={editor} features={features} />
        <TextFormating editor={editor} features={features} />
        <TextHeaders editor={editor} features={features} />
        <TextLists editor={editor} features={features} />
        <TextColor editor={editor} features={features} />
        <TextCode editor={editor} features={features} />
        <TextAlignment editor={editor} features={features} />
        <TextLinks editor={editor} features={features} />
        <AddImageButton
          editor={editor}
          features={features}
          onImageUpload={onImageUpload}
        />
        <TextTable editor={editor} features={features} />
        <TextClearFormating editor={editor} features={features} />
      </MenuBar>
      {/* Sub Bar */}
      <TableMenuBar editor={editor} />
    </MenuBars>
  );
};

const EditorMenu = {
  Bar: MenuBar,
  Bars: MenuBars,
  Button: MenuButton,
  Section: MenuSection,
  AddImageButton,
};

const EditorText = {
  History: TextHistory,
  Formating: TextFormating,
  Headers: TextHeaders,
  Lists: TextLists,
  Color: TextColor,
  Code: TextCode,
  Links: TextLinks,
  Table: TextTable,
  Alignment: TextAlignment,
  ClearFormating: TextClearFormating,
};
/* c8 ignore end */

export type { MenuBarProps };
export { EditorText, EditorMenu };
export default AmplifyBar;
