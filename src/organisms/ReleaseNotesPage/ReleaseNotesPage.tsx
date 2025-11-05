import { type FC, useMemo } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { ReleasePosts } from './ReleasePosts/ReleasePosts';
import { ReleaseNoteFilter } from './ReleaseNoteFilter';
import { Container, StickyRightSide } from './ReleaseNotesPage.styles';
import {
  extractYearsData,
  monthValueToString,
  yearId,
} from './ReleaseNotesPage.utils';
import { useFilteredReleaseNotes } from 'src/organisms/ReleaseNotesPage/hooks/useFilteredReleaseNotes';
import { TableOfContents } from 'src/organisms/TableOfContents/TableOfContents';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
} from 'src/providers/TableOfContentsProvider';

export const ReleaseNotesPage: FC = () => {
  const { data: releaseNotes } = useFilteredReleaseNotes();

  const pageMenuItems: TableOfContentsItemType[] = useMemo(() => {
    const items: TableOfContentsItemType[] = [];

    for (const item of extractYearsData(releaseNotes)) {
      items.push({
        value: yearId(item.value),
        label: item.label,
        children: item.months.map((month) => {
          return {
            label: month.label,
            value: monthValueToString(month.value),
          };
        }),
      });
    }

    return items;
  }, [releaseNotes]);

  return (
    <TableOfContentsProvider items={pageMenuItems}>
      <Container>
        <Typography variant="h1" bold>
          Release Notes
        </Typography>
        <section>
          <ReleaseNoteFilter />
          <ReleasePosts />
        </section>
        <StickyRightSide>
          <TableOfContents onlyShowSelectedChildren={false} />
        </StickyRightSide>
      </Container>
    </TableOfContentsProvider>
  );
};
