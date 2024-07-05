import { FC } from 'react';

import { EditorContent } from '@tiptap/react';

import { useFeatures } from '../../../hooks/useFeatures';
import { AmplifyKit } from './custom-extensions/DefaultKit';
import AmplifyBar from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorStyling } from './RichTextEditor.styles';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';

const RichText = {
  Styling: EditorStyling,
  Provider: EditorProvider,
  Content: EditorContent,
  Bar: AmplifyBar,
  Kit: AmplifyKit,
};

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
    <RichText.Styling
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <RichText.Provider
        content={value}
        onUpdate={onChange}
        features={usingFeatures}
        placeholder={placeholder}
        onImageUpload={onImageUpload}
      >
        {(editor) => (
          <div>
            <RichText.Bar
              editor={editor}
              features={usingFeatures}
              onImageUpload={onImageUpload}
            />
            <RichText.Content editor={editor} />
          </div>
        )}
      </RichText.Provider>
    </RichText.Styling>
  );
};

export type { RichTextEditorProps, OnImageUploadFn, RichTextEditorFeatures };
export { RichText };
export default RichTextEditor;
