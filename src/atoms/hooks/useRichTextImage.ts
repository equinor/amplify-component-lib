import { useQuery } from '@tanstack/react-query';

import { ImageExtensionFnProps } from 'src/molecules/RichTextEditor/RichTextEditor.types';

export function useRichTextImage(
  image: string,
  onImageRead: ImageExtensionFnProps['onImageRead'] | undefined
) {
  return useQuery({
    queryKey: [image],
    queryFn: async () => {
      if (onImageRead) {
        const response = await onImageRead(image);
        const extension = image.split('.').at(-1);
        return `data:image/${extension};base64,${response}`;
      }

      return image;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
