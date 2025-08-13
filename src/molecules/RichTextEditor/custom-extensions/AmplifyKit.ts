import { AnyExtension, Extension, Extensions } from '@tiptap/core';
import { Bold, BoldOptions } from '@tiptap/extension-bold';
import {
  CodeBlockLowlight,
  CodeBlockLowlightOptions,
} from '@tiptap/extension-code-block-lowlight';
import { Color, ColorOptions } from '@tiptap/extension-color';
import { Document } from '@tiptap/extension-document';
import GapCursor from '@tiptap/extension-gapcursor';
import { HardBreak, HardBreakOptions } from '@tiptap/extension-hard-break';
import { HeadingOptions } from '@tiptap/extension-heading';
import { Highlight, HighlightOptions } from '@tiptap/extension-highlight';
import { Italic, ItalicOptions } from '@tiptap/extension-italic';
import { Link, LinkOptions } from '@tiptap/extension-link';
import {
  BulletList,
  BulletListOptions,
  ListItem,
  ListItemOptions,
  OrderedList,
  OrderedListOptions,
} from '@tiptap/extension-list';
import { Paragraph, ParagraphOptions } from '@tiptap/extension-paragraph';
import {
  Table,
  TableCell,
  TableCellOptions,
  TableHeader,
  TableHeaderOptions,
  TableOptions,
  TableRow,
  TableRowOptions,
} from '@tiptap/extension-table';
import { Text } from '@tiptap/extension-text';
import { TextAlign, TextAlignOptions } from '@tiptap/extension-text-align';
import { TextStyle, TextStyleOptions } from '@tiptap/extension-text-style';
import { Typography, TypographyOptions } from '@tiptap/extension-typography';
import {
  Dropcursor,
  DropcursorOptions,
  Placeholder,
  PlaceholderOptions,
  UndoRedo,
  UndoRedoOptions,
} from '@tiptap/extensions';

import ExtendedHeaders from './ExtendedHeaders';
import ExtendedImage, { ExtendedImageOptions } from './ExtendedImage';
import { mergeDefaults } from './mergeDefaults';

import { common, createLowlight } from 'lowlight';
const lowlight = createLowlight(common);

export interface AmplifyKitOptions {
  bold: Partial<BoldOptions> | false;
  bulletList: Partial<BulletListOptions> | false;
  hardBreak: Partial<HardBreakOptions> | false;
  heading: Partial<HeadingOptions> | false;
  undoRedo: Partial<UndoRedoOptions> | false;
  italic: Partial<ItalicOptions> | false;
  listItem: Partial<ListItemOptions> | false;
  orderedList: Partial<OrderedListOptions> | false;
  paragraph: Partial<ParagraphOptions> | false;
  codeBlockLowlight: Partial<CodeBlockLowlightOptions> | false;
  color: Partial<ColorOptions> | false;
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
  dropCursor: Partial<DropcursorOptions> | false;
  gapCursor: false;
  document: false;
  text: false;
}

interface ExtensionsMap {
  name: keyof AmplifyKitOptions;
  extension: AnyExtension;
}

// This is where you add extensions that should come with the AmplifyKit
// Make sure the name matches a key in the AmplifyKitOptions interface so users can configure them externally
const extensions: ExtensionsMap[] = [
  { name: 'bold', extension: Bold },
  { name: 'bulletList', extension: BulletList },
  { name: 'document', extension: Document },
  { name: 'hardBreak', extension: HardBreak },
  { name: 'undoRedo', extension: UndoRedo },
  { name: 'italic', extension: Italic },
  { name: 'listItem', extension: ListItem },
  { name: 'orderedList', extension: OrderedList },
  { name: 'paragraph', extension: Paragraph },
  { name: 'text', extension: Text },
  { name: 'codeBlockLowlight', extension: CodeBlockLowlight },
  { name: 'color', extension: Color },
  { name: 'dropCursor', extension: Dropcursor },
  { name: 'gapCursor', extension: GapCursor },
  { name: 'highlight', extension: Highlight },
  { name: 'link', extension: Link },
  { name: 'placeholder', extension: Placeholder },
  { name: 'table', extension: Table },
  { name: 'tableCell', extension: TableCell },
  { name: 'tableHeader', extension: TableHeader },
  { name: 'tableRow', extension: TableRow },
  { name: 'typography', extension: Typography },
  { name: 'textStyle', extension: TextStyle },
  { name: 'textAlign', extension: TextAlign },
  { name: 'image', extension: ExtendedImage },
  { name: 'heading', extension: ExtendedHeaders },
];

export const AmplifyKit = Extension.create<AmplifyKitOptions>({
  name: 'AmplifyKit',
  addExtensions(): Extensions {
    const options = mergeDefaults({
      options: this.options,
      defaults: {
        // Default extension configurations
        codeBlockLowlight: { lowlight },
        highlight: { multicolor: true },
        table: { resizable: true },
        image: { allowBase64: true },
        placeholder: { placeholder: 'Add text and content here...' },
        textAlign: { types: ['heading', 'paragraph', 'img'] },
      },
    });

    return extensions
      .filter((ext) => options[ext.name] !== false)
      .map((ext) => {
        const config = options[ext.name];
        return config ? ext.extension.configure(config) : ext.extension;
      });
  },
});

export { mergeDefaults };
