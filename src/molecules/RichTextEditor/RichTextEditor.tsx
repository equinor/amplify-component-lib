import { FC, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import {
  error_outlined,
  thumbs_up,
  warning_outlined,
} from '@equinor/eds-icons';

import { AmplifyBar } from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import {
  EditorContent,
  EditorStyling,
  HelperWrapper,
  LabelWrapper,
  Wrapper,
} from './RichTextEditor.styles';
import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import {
  colors,
  VARIANT_COLORS,
  VARIANT_HELPER_TEXT_COLORS,
} from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';
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
  /**
   * @deprecated - Use new 'variant' prop instead
   */
  highlighted?: boolean;
  variant?: Variants;
  label?: string;
  meta?: string;
  helperText?: string;
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
 * @param variant - field variants - for example 'error'
 * @param highlighted - if it should have a highlighted border
 * @param label - Label text at top left
 * @param meta - Meta text at top right
 * @param helperText - Helper text bottom left
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
  variant,
  label,
  meta,
  helperText,
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

  const helperIcon = useMemo(() => {
    switch (variant) {
      case 'error':
        return error_outlined;
      case 'warning':
        return warning_outlined;
      case 'success':
        return thumbs_up;
    }
  }, [variant]);

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
        <Wrapper>
          {label && (
            <LabelWrapper>
              <Typography variant="label" group="input">
                {label}
              </Typography>
              {meta && (
                <Typography variant="helper" group="input">
                  {meta}
                </Typography>
              )}
            </LabelWrapper>
          )}
          <EditorStyling
            data-testid="richtext-editor"
            $border={border}
            $padding={padding}
            $lightBackground={lightBackground}
            $highlighted={highlighted}
            $variant={variant}
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
          {helperText && (
            <HelperWrapper>
              {helperIcon && variant ? (
                <Icon
                  data={helperIcon}
                  size={16}
                  color={VARIANT_COLORS[variant]}
                />
              ) : null}
              <Typography
                variant="helper"
                group="input"
                color={
                  variant
                    ? VARIANT_HELPER_TEXT_COLORS[variant]
                    : colors.text.static_icons__tertiary.rgba
                }
              >
                {helperText}
              </Typography>
            </HelperWrapper>
          )}
        </Wrapper>
      )}
    </EditorProvider>
  );
};
