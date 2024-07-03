import { useMemo } from 'react';

import {
  DEFAULT_FEATURES,
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../components/Inputs/RichTextEditor/RichTextEditor.types';

interface FeaturesProps {
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}

export const useFeatures = ({
  features,
  extendFeatures,
  removeFeatures,
  onImageUpload,
}: FeaturesProps) => {
  /* c8 ignore nextline */
  if (features && (extendFeatures ?? removeFeatures)) {
    throw new Error(
      `Can't specify both 'features' and 'extend/remove' features!
       Extend/remove can only be used when not specifying 'features'`
    );
  }

  const usingFeatures = useMemo(() => {
    if (features) return features;
    return [...DEFAULT_FEATURES, ...(extendFeatures ?? [])]
      .filter((feature) => !removeFeatures?.includes(feature))
      .filter((value, index, array) => index === array.indexOf(value));
  }, [features, extendFeatures, removeFeatures]);

  if (usingFeatures.length === 0) {
    throw new Error('Features cannot be empty!');
  } else if (
    usingFeatures.includes(RichTextEditorFeatures.IMAGES) &&
    onImageUpload === undefined
  ) {
    throw new Error(
      `onImageUpload cannot be undefined when features include images!
      Either add the onImageUpload function or remove RichTextEditorFeatures.IMAGES from the features array`
    );
  }

  return usingFeatures;
};
