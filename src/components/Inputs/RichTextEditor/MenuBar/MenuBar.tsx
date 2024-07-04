import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { Editor } from '@tiptap/react';

import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
import { TextTable } from './Table/Table';
import TableMenuBar from './Table/TableBar';
import { AddImageButton } from './AddImage';
import { TextAlignment } from './Alignment';
import { TextClearFormating } from './ClearFormating';
import { TextCode } from './Code';
import { TextFormating } from './Formating';
import { TextHeaders } from './Headers';
import { TextHistory } from './History';
import { TextLinks } from './Links';
import { TextLists } from './Lists';
import { MenuSection } from './MenuBar.styles';
import MenuButton from './MenuButton';
import { TextColor } from './TextColor';

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

const AmplifyBar: FC<MenuBarProps> = ({ editor, features, onImageUpload }) => {
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

export {
  MenuBar,
  MenuBars,
  TextHistory,
  TextFormating,
  TextHeaders,
  TextLists,
  TextColor,
  TextCode,
  TextLinks,
  TextTable,
  TextAlignment,
  TextClearFormating,
  AddImageButton,
  MenuButton,
  MenuSection,
  AmplifyBar,
};
export default AmplifyBar;
