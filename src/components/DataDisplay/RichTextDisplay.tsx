import { FC, useEffect, useRef } from 'react';

import Bold from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import DropCursor from '@tiptap/extension-dropcursor';
import GapCursor from '@tiptap/extension-gapcursor';
import { HardBreak } from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';

import { Wrapper } from '../Inputs/RichTextEditor/RichTextEditor.styles';

import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

const extensions = [
  BulletList,
  Bold,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Color,
  Document,
  DropCursor,
  GapCursor,
  HardBreak,
  Heading,
  History,
  Image.configure({
    allowBase64: true,
  }),
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Table.configure({
    resizable: true,
  }),
  TableCell,
  TableHeader,
  TableRow,
  Text,
  Typography,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'img'],
  }),
];

export interface RichTextDisplayProps {
  value: string | null | undefined;
  imgReadToken?: string;
  lightBackground?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const RichTextDisplay: FC<RichTextDisplayProps> = ({
  value,
  imgReadToken,
  lightBackground = true,
  padding = 'md',
}) => {
  const editor = useEditor({
    extensions: extensions,
    content: imgReadToken
      ? value?.replaceAll(/(<img src=")(.+)("\/>)/g, `$1$2?${imgReadToken}$3`)
      : value,
    editable: false,
  });

  const previousValue = useRef(value);

  useEffect(() => {
    if (editor && value && value !== previousValue.current) {
      editor.commands.setContent(value);
      previousValue.current = value;
    }
  }, [editor, value]);

  return (
    <Wrapper $lightBackground={lightBackground} $padding={padding}>
      <EditorContent editor={editor} readOnly />
    </Wrapper>
  );
};

export default RichTextDisplay;
