import { ReleaseNotesService } from '@equinor/subsurface-app-management';

export function releaseNoteImageRead(src: string) {
  let usingSrc = src;
  // Old way of reading images has URL in src
  if (src.includes('https')) {
    const [_, image] = src.split('release-note-images/');
    usingSrc = decodeURIComponent(image);
  }
  return ReleaseNotesService.getReleaseNoteImage(usingSrc);
}
