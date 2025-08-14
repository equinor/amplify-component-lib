import { useEffect, useRef } from 'react';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

import { getImagesFromRichText } from 'src/atoms/utils';
import { ImageExtensionFnProps } from 'src/molecules/RichTextEditor/RichTextEditor.types';

interface UsePrefetchRichTextImagesArgs {
  richTextValues: string[];
  onImageRead: NonNullable<ImageExtensionFnProps['onImageRead']>;
}

export function usePrefetchRichTextImages({
  richTextValues,
  onImageRead,
}: UsePrefetchRichTextImagesArgs) {
  const queryClient = useQueryClient();
  const startedPrefetch = useRef<string[]>([]);
  const prefetched = useRef<string[]>([]);
  const paths = richTextValues.flatMap((value) => getImagesFromRichText(value));
  const isPrefetching =
    useIsFetching({
      predicate: (query) =>
        startedPrefetch.current.some(
          (path) =>
            query.queryKey[0] === path && !prefetched.current.includes(path)
        ),
    }) > 0;

  useEffect(() => {
    const handlePrefetch = async (path: string) => {
      await queryClient.prefetchQuery({
        queryKey: [path],
        queryFn: async () => {
          const response = await onImageRead(path);
          const extension = path.split('.').at(-1);
          return `data:image/${extension};base64,${response}`;
        },
        staleTime: Infinity,
        gcTime: Infinity,
      });
      prefetched.current.push(path);
    };
    for (const path of paths.filter(
      (path) => !startedPrefetch.current.includes(path)
    )) {
      startedPrefetch.current.push(path);
      handlePrefetch(path);
    }
  }, [onImageRead, paths, queryClient]);

  return { isPrefetching };
}
