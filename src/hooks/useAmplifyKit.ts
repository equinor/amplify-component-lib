import { useMemo } from 'react';

import { AmplifyKit } from '../components/Inputs/RichTextEditor/custom-extensions/DefaultKit';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from '../components/Inputs/RichTextEditor/RichTextEditor.types';

interface AmplifyKitProps {
  features?: RichTextEditorFeatures[];
  placeholder?: string;
  onImageUpload?: OnImageUploadFn;
}

export const useAmplifyKit = ({
  features,
  placeholder,
  onImageUpload,
}: AmplifyKitProps) => {
  // This hooks is where we can use the features API we made to turn off extensions in the new configure API
  // Currently its only turning off the image extension since its the only one that needs to be turned off for the moment
  // The new compound component structure also lets users circumvent this if they need more control
  return useMemo(
    () =>
      AmplifyKit.configure({
        placeholder: placeholder ? { placeholder } : undefined,
        image: features?.includes(RichTextEditorFeatures.IMAGES)
          ? { onImageUpload }
          : false,
      }),
    [onImageUpload, placeholder, features]
  );
};
