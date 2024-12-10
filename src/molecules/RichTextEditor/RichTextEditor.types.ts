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

type OnImageUploadFn = (
  file: File
) => Promise<{ src: string; alt: string } | undefined>;

// TODO: Undo images calls onImageUpload again
export interface ImageExtensionFnProps {
  onImageUpload?: OnImageUploadFn;
  onImageRead?: (src: string) => Promise<string>;
  onImageRemove?: (src: string) => Promise<void>;
  onRemovedImagesChange?: (images: string[]) => void;
}

export interface EditorPanel {
  editor: Editor;
  features?: RichTextEditorFeatures[];
}
