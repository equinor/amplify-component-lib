import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { Editor } from '@tiptap/react';

import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
import AddImage from './AddImage';
import { TextLinks } from './Links';
import { TableMenuBar } from './Table/TableBar';
import TextColor from './TextColor';

import styled from 'styled-components';
import { TextHistory } from './History';
import { TextFormating } from './Formating';
import { TextHeaders } from './Headers';
import { TextLists } from './Lists';
import { TextCode } from './Code';
import { TextAlignment } from './Alignment';
import { TextTable } from './Table/Table';
import { ClearFormating } from './ClearFormating';
import MenuButton from './MenuButton';
import { MenuSection } from './MenuBar.styles';

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
        <TextHeaders editor={editor} features={features} />x
        <TextLists editor={editor} features={features} />
        <TextColor editor={editor} features={features} />
        <TextCode editor={editor} features={features} />
        <TextAlignment editor={editor} features={features} />
        <TextLinks editor={editor} features={features} />
        <AddImage
          editor={editor}
          features={features}
          onImageUpload={onImageUpload}
        />
        <TextTable editor={editor} features={features} />
        <ClearFormating editor={editor} features={features} />
      </MenuBar>
      {/* Sub Bar */}
      <TableMenuBar editor={editor} />
    </MenuBars>
  );
};

export {
  MenuBar,
  TextHistory,
  TextFormating,
  TextHeaders,
  TextLists,
  TextColor,
  TextCode,
  TextAlignment,
  TextLinks,
  AddImage,
  TextTable,
  ClearFormating,
  MenuButton,
  MenuSection,
  AmplifyBar,
};
export default AmplifyBar;
