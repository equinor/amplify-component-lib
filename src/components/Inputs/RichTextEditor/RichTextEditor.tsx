import { FC } from 'react';

import { EditorContent } from '@tiptap/react';

import getFeatures from '../../../utils/getFeatures';
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
  minHeight?: string;
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
  minHeight,
  lightBackground,
  border = true,
}) => {
  const usedFeatured = getFeatures({
    features,
    extendFeatures,
    removeFeatures,
    onImageUpload,
  });
  return (
    <RichText.Provider
      content={value}
      onUpdate={onChange}
      features={usedFeatured}
      placeholder={placeholder}
      onImageUpload={onImageUpload}
    >
      {(editor) => (
        <RichText.Styling
          $border={border}
          $padding={padding}
          $maxHeight={maxHeight}
          $minHeight={minHeight}
          $lightBackground={lightBackground}
        >
          <RichText.Bar
            editor={editor}
            features={usedFeatured}
            onImageUpload={onImageUpload}
          />
          <RichText.Content editor={editor} />
        </RichText.Styling>
      )}
    </RichText.Provider>
  );
};

const RichText = {
  Styling: EditorStyling,
  Provider: EditorProvider,
  Content: EditorContent,
  Bar: AmplifyBar,
  Kit: AmplifyKit,
};

export type { RichTextEditorProps, OnImageUploadFn, RichTextEditorFeatures };
export { RichText };
export default RichTextEditor;
