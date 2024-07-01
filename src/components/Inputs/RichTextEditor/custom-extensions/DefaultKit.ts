import { Extension } from '@tiptap/core';
import { Bold, BoldOptions } from '@tiptap/extension-bold';
import { BulletList, BulletListOptions } from '@tiptap/extension-bullet-list';
import { Document } from '@tiptap/extension-document';
import { HardBreak, HardBreakOptions } from '@tiptap/extension-hard-break';
import { HeadingOptions } from '@tiptap/extension-heading';
import { History, HistoryOptions } from '@tiptap/extension-history';
import { Italic, ItalicOptions } from '@tiptap/extension-italic';
import { ListItem, ListItemOptions } from '@tiptap/extension-list-item';
import {
  OrderedList,
  OrderedListOptions,
} from '@tiptap/extension-ordered-list';
import { Paragraph, ParagraphOptions } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';

import {
  CodeBlockLowlight,
  CodeBlockLowlightOptions,
} from '@tiptap/extension-code-block-lowlight';
import { Color, ColorOptions } from '@tiptap/extension-color';
import { Dropcursor, DropcursorOptions } from '@tiptap/extension-dropcursor';
import GapCursor from '@tiptap/extension-gapcursor';
import { Highlight, HighlightOptions } from '@tiptap/extension-highlight';
import { Link, LinkOptions } from '@tiptap/extension-link';
import { Placeholder, PlaceholderOptions } from '@tiptap/extension-placeholder';
import { Table, TableOptions } from '@tiptap/extension-table';
import { TableCell, TableCellOptions } from '@tiptap/extension-table-cell';
import {
  TableHeader,
  TableHeaderOptions,
} from '@tiptap/extension-table-header';
import { TableRow, TableRowOptions } from '@tiptap/extension-table-row';
import { TextAlign, TextAlignOptions } from '@tiptap/extension-text-align';
import { TextStyle, TextStyleOptions } from '@tiptap/extension-text-style';
import { Typography, TypographyOptions } from '@tiptap/extension-typography';

import ExtendedHeaders from './ExtendedHeaders';
import ExtendedImage, { ExtendedImageOptions } from './ExtendedImage';

export interface StarterKitOptions {
  bold: Partial<BoldOptions> | false;
  bulletList: Partial<BulletListOptions> | false;
  hardBreak: Partial<HardBreakOptions> | false;
  heading: Partial<HeadingOptions> | false;
  history: Partial<HistoryOptions> | false;
  italic: Partial<ItalicOptions> | false;
  listItem: Partial<ListItemOptions> | false;
  orderedList: Partial<OrderedListOptions> | false;
  paragraph: Partial<ParagraphOptions> | false;
  codeBlockLowlight: Partial<CodeBlockLowlightOptions> | false;
  color: Partial<ColorOptions> | false;
  dropCursor: Partial<DropcursorOptions> | false;
  gapCursor: false;
  image: Partial<ExtendedImageOptions> | false;
  highlight: Partial<HighlightOptions> | false;
  link: Partial<LinkOptions> | false;
  placeholder: Partial<PlaceholderOptions> | false;
  table: Partial<TableOptions> | false;
  tableCell: Partial<TableCellOptions> | false;
  tableHeader: Partial<TableHeaderOptions> | false;
  tableRow: Partial<TableRowOptions> | false;
  typography: Partial<TypographyOptions> | false;
  textStyle: Partial<TextStyleOptions> | false;
  textAlign: Partial<TextAlignOptions> | false;
  document: false;
  text: false;
}

export default Extension.create<StarterKitOptions>({
  name: 'defaultKit',
  addExtensions() {
    const extensions = [];

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList));
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem));
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    if (this.options.codeBlockLowlight !== false) {
      extensions.push(
        CodeBlockLowlight.configure(this.options?.codeBlockLowlight)
      );
    }

    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options?.color));
    }

    if (this.options.dropCursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropCursor));
    }

    if (this.options.gapCursor !== false) {
      extensions.push(GapCursor);
    }

    if (this.options.highlight !== false) {
      extensions.push(Highlight.configure(this.options?.highlight));
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }

    if (this.options.placeholder !== false) {
      extensions.push(Placeholder.configure(this.options?.placeholder));
    }

    if (this.options.table !== false) {
      extensions.push(Table.configure(this.options?.table));
    }

    if (this.options.tableCell !== false) {
      extensions.push(TableCell.configure(this.options?.tableCell));
    }

    if (this.options.tableHeader !== false) {
      extensions.push(TableHeader.configure(this.options?.tableHeader));
    }

    if (this.options.tableRow !== false) {
      extensions.push(TableRow.configure(this.options?.tableRow));
    }

    if (this.options.typography !== false) {
      extensions.push(Typography.configure(this.options?.typography));
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options?.textStyle));
    }

    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure(this.options?.textAlign));
    }

    if (this.options.image !== false) {
      extensions.push(ExtendedImage.configure(this.options?.image));
    }

    if (this.options.heading !== false) {
      extensions.push(ExtendedHeaders.configure(this.options?.heading));
    }

    return extensions;
  },
});
