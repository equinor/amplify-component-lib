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
import { TextClearFormatting } from './TextClearFormatting';
import { TextCode } from './TextCode';
import { TextColor } from './TextColor';
import { TextFormatting } from './TextFormatting';
import { TextHeaders } from './TextHeaders';
import { TextHighlight } from './TextHighlight';
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

/* v8 ignore start */
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
        <TextFormatting editor={editor} features={features} />
        <TextHeaders editor={editor} features={features} />
        <TextLists editor={editor} features={features} />
        <TextColor editor={editor} features={features} />
        <TextHighlight editor={editor} features={features} />
        <TextCode editor={editor} features={features} />
        <TextAlignment editor={editor} features={features} />
        <TextLinks editor={editor} features={features} />
        <AddImageButton
          editor={editor}
          features={features}
          onImageUpload={onImageUpload}
        />
        <TextTable editor={editor} features={features} />
        <TextClearFormatting editor={editor} features={features} />
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
  Formatting: TextFormatting,
  Headers: TextHeaders,
  Lists: TextLists,
  Color: TextColor,
  Code: TextCode,
  Links: TextLinks,
  Table: TextTable,
  TableBar: TableMenuBar,
  Alignment: TextAlignment,
  ClearFormatting: TextClearFormatting,
};
/* v8 ignore end */
