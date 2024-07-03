import { FC } from 'react';
import { EditorContent } from '@tiptap/react';

import MenuBar from './MenuBar/MenuBar';
import { EditorWrapper } from './RichTextEditor.styles';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { EditorProvider } from './EditorProvider';
import { useFeatures } from '../../../hooks/useFeatures';
import { useEditor } from '@tiptap/react';
import { useAmplifyKit } from '../../../hooks/useAmplifyKit';
import { AmplifyKit } from './custom-extensions/DefaultKit';

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
    <EditorWrapper
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
            <MenuBar
              editor={editor}
              features={usingFeatures}
              onImageUpload={onImageUpload}
            />
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </EditorWrapper>
  );
};

export {
  EditorWrapper,
  EditorProvider,
  EditorContent,
  MenuBar,
  useEditor,
  useAmplifyKit,
  AmplifyKit,
};

export type { RichTextEditorProps, OnImageUploadFn, RichTextEditorFeatures };
export default RichTextEditor;
