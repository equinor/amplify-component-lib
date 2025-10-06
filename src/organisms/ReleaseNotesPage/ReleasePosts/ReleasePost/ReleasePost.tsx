import { type FC, useRef } from 'react';

import {
  type ReleaseNote as ReleaseNoteApiType,
  ReleaseNotesService,
} from '@equinor/subsurface-app-management';

import { ReleasePostSkeleton } from './ReleasePostSkeleton';
import { usePrefetchRichTextImages } from 'src/atoms/hooks/usePrefetchRichTextImages';
import { ReleaseNote } from 'src/organisms/ReleaseNote/ReleaseNote';

// We already have tests for usePrefetchRichTextImages
/* v8 ignore start */
export const ReleasePost: FC<ReleaseNoteApiType> = (props) => {
  const { isPrefetching } = usePrefetchRichTextImages({
    richTextValues: [props.body],
    onImageRead: (path) => ReleaseNotesService.getReleaseNoteImage(path),
  });
  const releaseNoteRef = useRef<HTMLDivElement | null>(null);

  if (isPrefetching) {
    return <ReleasePostSkeleton />;
  }
  /* v8 ignore end */

  return <ReleaseNote ref={releaseNoteRef} {...props} />;
};
