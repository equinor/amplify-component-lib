import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { Editor } from '@tiptap/react';

import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../RichTextEditor.types';
import AddImage from './AddImage';
import Links from './Links';
import TableBar from './TableBar';
import TextColor from './TextColor';

import styled from 'styled-components';
import { History } from './History';
import { Formating } from './Formating';
import { Headers } from './Headers';
import { Lists } from './Lists';
import { Code } from './Code';
import { Alignment } from './Alignment';
import { Table } from './Table';
import { ClearFormating } from './ClearFormating';
import MenuButton from './MenuButton';

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

export {
  MenuBar,
  History,
  Formating,
  Headers,
  Lists,
  TextColor,
  Code,
  Alignment,
  Links,
  AddImage,
  Table,
  ClearFormating,
  MenuButton,
  TableBar,
};
export default MenuBar;
