import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { ReleaseNote } from '@equinor/subsurface-app-management';

import { ReleasePost } from './ReleasePost/ReleasePost';
import { Container, ContainerNoResults } from './ReleasePosts.styles';
import { Typography } from 'src/molecules';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { monthValueToString } from 'src/providers/ReleaseNotesProvider.utils';

const { colors } = tokens;

interface ReleasePostsProps {
  posts: ReleaseNote[] | undefined;
}

export const ReleasePosts: FC<ReleasePostsProps> = ({ posts: data }) => {
  const {
    search,
    selectedReleaseNoteTypes,
    filteredData: releaseNotes,
    releaseNotesYears,
  } = useReleaseNotes();

  // Display this if no release posts are present whatsoever
  if (!data || data?.length === 0) {
    return (
      <ContainerNoResults>
        <Typography
          group="heading"
          variant="h4"
          color={colors.text.static_icons__default.rgba}
        >
          There are no posts at the moment
        </Typography>
      </ContainerNoResults>
    );
  }

  // Display this if there are release posts, but none of them match the current search/filter criterias
  if (releaseNotes?.length === 0) {
    return (
      <ContainerNoResults>
        <Typography
          group="heading"
          variant="h4"
          color={colors.text.static_icons__default.rgba}
        >
          {`Nothing matching "${search.searchValue ?? ''} ${
            selectedReleaseNoteTypes?.map((t) => t.value).join(', ') ?? ''
          }"`}
        </Typography>
      </ContainerNoResults>
    );
  }

  return (
    <Container>
      {releaseNotesYears?.map((year, idx) => {
        return (
          <Container key={`year-${year.value}-${idx}`}>
            <Typography variant="h4" id={year.value}>
              {year.label}
            </Typography>
            {year.children?.flatMap((month) => {
              const releaseNotesInMonth = releaseNotes?.filter(
                (releaseNote) =>
                  releaseNote.createdDate &&
                  monthValueToString(new Date(releaseNote.createdDate)) ===
                    month.value
              );

              return [
                <Typography
                  key={`month-${month.label}`}
                  variant="h5"
                  id={month.value}
                >
                  {month.label}
                </Typography>,
                ...releaseNotesInMonth.map((releaseNote) => (
                  <ReleasePost
                    key={`${month.label}-${releaseNote.releaseId}`}
                    {...releaseNote}
                  />
                )),
              ];
            })}
          </Container>
        );
      })}
    </Container>
  );
};
