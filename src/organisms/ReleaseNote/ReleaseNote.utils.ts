import { ReleaseNote } from '@equinor/subsurface-app-management';

export const WORDS_PER_MINUTE = 238;
export function timeToRead(body: string): string {
  const wordCount = body.split(/\s/g).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min read`;
}

export function usingReleaseNoteDate(
  releaseNote: Pick<ReleaseNote, 'releaseDate' | 'createdDate'>
): string {
  return releaseNote.releaseDate ?? releaseNote.createdDate;
}
