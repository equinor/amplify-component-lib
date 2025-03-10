import { ReleaseNote } from '@equinor/subsurface-app-management';

import { sortByDate } from 'src/atoms';

const sortReleaseNotesByDate = (a: ReleaseNote, b: ReleaseNote) => {
  return sortByDate(
    a.releaseDate ?? a.createdDate,
    b.releaseDate ?? b.createdDate
  );
};
export { sortReleaseNotesByDate };
