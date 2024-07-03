import { FC } from 'react';
import { useEditor, Extensions, Editor } from '@tiptap/react';

import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { useAmplifyKit } from '../../../hooks/useAmplifyKit';

interface EditorProviderProps {
  children: (editor: Editor) => JSX.Element;
  content: string | null | undefined;
  extensions?: Extensions;
  onUpdate?: (html: string) => void;
  placeholder?: string;
  onImageUpload?: OnImageUploadFn;
  features?: RichTextEditorFeatures[];
}

const EditorProvider: FC<EditorProviderProps> = ({
  children,
  content,
  features,
  placeholder,
  onUpdate,
  onImageUpload,
  extensions = [],
}) => {
  const ampExtensions = useAmplifyKit({
    placeholder,
    onImageUpload,
    features,
  });

  const editor = useEditor({
    content,
    extensions: [ampExtensions, ...extensions],
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
  });

  if (!editor) return null;
  return children(editor);
};

export { EditorProvider };
