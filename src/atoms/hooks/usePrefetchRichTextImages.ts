import { useEffect, useRef } from 'react';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

import { getImagesFromRichText } from 'src/atoms';
import { ImageExtensionFnProps } from 'src/molecules';

interface UsePrefetchRichTextImagesArgs {
  richTextValues: string[];
  onImageRead: NonNullable<ImageExtensionFnProps['onImageRead']>;
}

export function usePrefetchRichTextImages({
  richTextValues,
  onImageRead,
}: UsePrefetchRichTextImagesArgs) {
  const queryClient = useQueryClient();
  const prefetched = useRef<string[]>([]);
  const paths = richTextValues.flatMap((value) => getImagesFromRichText(value));
  const isPrefetching =
    useIsFetching({
      predicate: (query) => paths.some((path) => query.queryKey[0] === path),
    }) > 0;

  useEffect(() => {
    for (const path of paths.filter(
      (path) => !prefetched.current.includes(path)
    )) {
      prefetched.current.push(path);
      queryClient.prefetchQuery({
        queryKey: [path],
        queryFn: async () => {
          const response = await onImageRead(path);
          const extension = path.split('.').at(-1);
          return `data:image/${extension};base64,${response}`;
        },
        staleTime: Infinity,
        gcTime: Infinity,
      });
    }
  }, [onImageRead, paths, queryClient]);

  return { isPrefetching };
}
