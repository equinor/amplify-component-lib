import { FC } from 'react';

import { EditorContent } from '@tiptap/react';
import { useEditor } from '@tiptap/react';

import { useAmplifyKit } from '../../../hooks/useAmplifyKit';
import { useFeatures } from '../../../hooks/useFeatures';
import { AmplifyKit } from './custom-extensions/DefaultKit';
import AmplifyBar from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorStyling } from './RichTextEditor.styles';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';

interface RichTextEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  onImageUpload?: OnImageUploadFn;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  padding?: 'sm' | 'md' | 'lg' | 'none';
  maxHeight?: string;
  lightBackground?: boolean;
  border?: boolean;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  placeholder,
  features,
  extendFeatures,
  removeFeatures,
  padding = 'md',
  maxHeight,
  lightBackground,
  border = true,
}) => {
  const usingFeatures = useFeatures({
    features,
    extendFeatures,
    removeFeatures,
    onImageUpload,
  });
  return (
    <EditorStyling
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <EditorProvider
        content={value}
        onUpdate={onChange}
        features={usingFeatures}
        placeholder={placeholder}
        onImageUpload={onImageUpload}
      >
        {(editor) => (
          <div>
            <AmplifyBar
              editor={editor}
              features={usingFeatures}
              onImageUpload={onImageUpload}
            />
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </EditorStyling>
  );
};

export {
  EditorStyling,
  EditorProvider,
  EditorContent,
  AmplifyBar,
  AmplifyKit,
  useAmplifyKit,
  useFeatures,
  useEditor,
};

export type { RichTextEditorProps, OnImageUploadFn, RichTextEditorFeatures };
export default RichTextEditor;
