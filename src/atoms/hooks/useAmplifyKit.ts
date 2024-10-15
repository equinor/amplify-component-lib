import { useMemo } from 'react';

import { RichText } from 'src/molecules/RichTextEditor';
import {
  OnImageUploadFn,
  RichTextEditorFeatures,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

interface AmplifyKitProps {
  features?: RichTextEditorFeatures[];
  placeholder?: string;
  onImageUpload?: OnImageUploadFn;
}

/* c8 ignore start */
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
      RichText.Kit.configure({
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
          ? { onImageUpload }
          : false,
        heading: features?.includes(RichTextEditorFeatures.HEADERS)
          ? {}
          : false,
      }),
    [onImageUpload, placeholder, features]
  );
};
/* c8 ignore stop */
