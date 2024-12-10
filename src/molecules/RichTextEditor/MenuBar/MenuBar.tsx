import { FC } from 'react';

import { Editor } from '@tiptap/react';

import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
import { TextTable } from './Table/Table';
import { TableMenuBar } from './Table/TableBar';
import { AddImageButton } from './AddImageButton';
import { MenuSection } from './MenuBar.styles';
import { MenuButton } from './MenuButton';
import { TextAlignment } from './TextAlignment';
import { TextClearFormating } from './TextClearFormating';
import { TextCode } from './TextCode';
import { TextColor } from './TextColor';
import { TextFormating } from './TextFormating';
import { TextHeaders } from './TextHeaders';
import { TextHistory } from './TextHistory';
import { TextLinks } from './TextLinks';
import { TextLists } from './TextLists';
import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const MenuBars = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.small};
  padding: ${spacings.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

export interface MenuBarProps
  extends Pick<ImageExtensionFnProps, 'onImageUpload'> {
  editor: Editor;
  features: RichTextEditorFeatures[];
}

/* c8 ignore start */
export const AmplifyBar: FC<MenuBarProps> = ({
  editor,
  features,
  onImageUpload,
}) => {
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

export const EditorMenu = {
  Bar: MenuBar,
  Bars: MenuBars,
  Button: MenuButton,
  Section: MenuSection,
  AddImageButton,
};

export const EditorText = {
  History: TextHistory,
  Formating: TextFormating,
  Headers: TextHeaders,
  Lists: TextLists,
  Color: TextColor,
  Code: TextCode,
  Links: TextLinks,
  Table: TextTable,
  TableBar: TableMenuBar,
  Alignment: TextAlignment,
  ClearFormating: TextClearFormating,
};
/* c8 ignore end */
