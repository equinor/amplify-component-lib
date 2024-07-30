import { FC } from 'react';

import { AmplifyBar } from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorContent, EditorStyling } from './RichTextEditor.styles';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { richtext } from 'src/atoms';

export interface RichTextEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  onImageUpload?: OnImageUploadFn;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  padding?: 'sm' | 'md' | 'lg' | 'none';
  maxHeight?: string;
  minHeight?: string;
  lightBackground?: boolean;
  border?: boolean;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  placeholder,
  features,
  extendFeatures,
  removeFeatures,
  padding = 'md',
  maxHeight,
  minHeight,
  lightBackground,
  border = true,
}) => {
  const usedFeatured = richtext.getFeatures({
    features,
    extendFeatures,
    removeFeatures,
    onImageUpload,
  });
  return (
    <EditorProvider
      content={value}
      onUpdate={onChange}
      features={usedFeatured}
      placeholder={placeholder}
      onImageUpload={onImageUpload}
    >
      {(editor) => (
        <EditorStyling
          $border={border}
          $padding={padding}
          $lightBackground={lightBackground}
        >
          <AmplifyBar
            editor={editor}
            features={usedFeatured}
            onImageUpload={onImageUpload}
          />
          <EditorContent
            editor={editor}
            $maxHeight={maxHeight}
            $minHeight={minHeight}
          />
        </EditorStyling>
      )}
    </EditorProvider>
  );
};
