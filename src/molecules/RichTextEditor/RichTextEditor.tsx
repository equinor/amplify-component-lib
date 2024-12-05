import { FC } from 'react';

import { AmplifyBar } from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorContent, EditorStyling } from './RichTextEditor.styles';
import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { getFeatures } from 'src/atoms/utils/richtext';

export interface RichTextEditorProps extends ImageExtensionFnProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  padding?: 'sm' | 'md' | 'lg' | 'none';
  maxHeight?: string;
  minHeight?: string;
  lightBackground?: boolean;
  border?: boolean;
  highlighted?: boolean;
}

/**
 *
 * @param value - Rich text content
 * @param onChange - handler for when the content changes
 * @param onImageUpload - handler for when an image is uploaded
 * @param onImageRead - handler used when loading images, expects b64 string to be returned
 * @param onImageRemove - called when an image removed, use when deleting images instantly
 * @param onRemovedImagesChange - called when the list of removed images change
 * @param placeholder - placeholder text if there is no content
 * @param features - which features should be enabled
 * @param extendFeatures - additional features to be added
 * @param removeFeatures - features to exclude from default features
 * @param padding - padding in the editor
 * @param maxHeight - maxHeight of the text box
 * @param minHeight - minHeight of the text box
 * @param lightBackground - if it should have a different BG color
 * @param border - if it should have a border
 * @param highlighted - if it should have a highlighted border
 */
export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  onImageRead,
  onImageRemove,
  onRemovedImagesChange,
  placeholder,
  features,
  extendFeatures,
  removeFeatures,
  padding = 'md',
  maxHeight,
  minHeight,
  lightBackground,
  border = true,
  highlighted = false,
}) => {
  if (onImageRemove && onRemovedImagesChange) {
    throw new Error(
      'onImageRemove and onRemovedImagesChange cannot be used together'
    );
  }

  const usedFeatured = getFeatures({
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
      onImageRead={onImageRead}
      onImageRemove={onImageRemove}
      onRemovedImagesChange={onRemovedImagesChange}
    >
      {(editor) => (
        <EditorStyling
          data-testid="richtext-editor"
          $border={border}
          $padding={padding}
          $lightBackground={lightBackground}
          $highlighted={highlighted}
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
