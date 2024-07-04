import { Editor } from '@tiptap/react';

export enum RichTextEditorFeatures {
  HISTORY = 'history',
  FORMATTING = 'formatting',
  HEADERS = 'headers',
  LISTS = 'lists',
  TEXT_COLOR = 'text-color',
  CODE = 'code',
  ALIGNMENT = 'alignment',
  LINKS = 'links',
  IMAGES = 'images',
  CLEAR_FORMATTING = 'clear-formatting',
  TABLE = 'table',
}

export const DEFAULT_FEATURES = [
  RichTextEditorFeatures.HISTORY,
  RichTextEditorFeatures.FORMATTING,
  RichTextEditorFeatures.HEADERS,
  RichTextEditorFeatures.LISTS,
  RichTextEditorFeatures.TEXT_COLOR,
  RichTextEditorFeatures.CODE,
  RichTextEditorFeatures.ALIGNMENT,
  RichTextEditorFeatures.LINKS,
  RichTextEditorFeatures.IMAGES,
  RichTextEditorFeatures.TABLE,
  RichTextEditorFeatures.CLEAR_FORMATTING,
];

export type OnImageUploadFn = (
  file: File
) => Promise<{ b64: string; url: string } | undefined>;

export interface EditorPanel {
  features?: RichTextEditorFeatures[];
  editor: Editor;
}
