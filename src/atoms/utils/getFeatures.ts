import {
  DEFAULT_FEATURES,
  OnImageUploadFn,
  RichTextEditorFeatures,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

export interface FeaturesProps {
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}

export const getFeatures = ({
  features,
  extendFeatures,
  removeFeatures,
  onImageUpload,
}: FeaturesProps) => {
  const defaultFeatures = features ?? DEFAULT_FEATURES;
  const additionalFeatures = extendFeatures ?? [];
  const usedFeatures = [...defaultFeatures, ...additionalFeatures]
    .filter((feature) => !removeFeatures?.includes(feature))
    .filter((value, index, array) => index === array.indexOf(value)); // Remove duplicates

  if (
    usedFeatures.includes(RichTextEditorFeatures.IMAGES) &&
    onImageUpload === undefined
  ) {
    throw new Error(
      `onImageUpload cannot be undefined when features include images!
      Either add the onImageUpload function or remove RichTextEditorFeatures.IMAGES from the features array`
    );
  }
  return usedFeatures;
};
