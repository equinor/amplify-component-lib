import { useMemo } from 'react';

import { AmplifyKit } from 'src/molecules/RichTextEditor/custom-extensions/AmplifyKit';
import {
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

interface AmplifyKitProps extends ImageExtensionFnProps {
  features?: RichTextEditorFeatures[];
  placeholder?: string;
}

/* c8 ignore start */
export const useAmplifyKit = ({
  features,
  placeholder,
  onImageUpload,
  onImageRead,
}: AmplifyKitProps) => {
  // This hooks is where we can use the features API we made to turn off extensions in the new configure API
  // Currently its only turning off the image extension since its the only one that needs to be turned off for the moment
  // The new compound component structure also lets users circumvent this if they need more control
  return useMemo(
    () =>
      AmplifyKit.configure({
        placeholder: placeholder ? { placeholder } : undefined,
        link: features?.includes(RichTextEditorFeatures.LINKS) ? {} : false,
        table: features?.includes(RichTextEditorFeatures.TABLE) ? {} : false,
        textAlign: features?.includes(RichTextEditorFeatures.ALIGNMENT)
          ? {}
          : false,
        bulletList: features?.includes(RichTextEditorFeatures.LISTS)
          ? {}
          : false,
        orderedList: features?.includes(RichTextEditorFeatures.LISTS)
          ? {}
          : false,
        codeBlockLowlight: features?.includes(RichTextEditorFeatures.CODE)
          ? {}
          : false,
        image: features?.includes(RichTextEditorFeatures.IMAGES)
          ? { onImageUpload, onImageRead }
          : false,
        heading: features?.includes(RichTextEditorFeatures.HEADERS)
          ? {}
          : false,
      }),
    [placeholder, features, onImageUpload, onImageRead]
  );
};
/* c8 ignore stop */
