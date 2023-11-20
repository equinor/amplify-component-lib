import { FC } from 'react';

import { CircularProgress, Typography } from '@equinor/eds-core-react';

import ReleasePost from './ReleasePost';
import {
  Container,
  ContainerNoResults,
  LoadingWrapper,
} from './ReleasePosts.styles';
import { useReleaseNotesQuery } from 'src/hooks/useReleaseNotesQuery';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { monthValueToString, yearValueToString } from 'src/utils/releaseNotes';

const ReleasePosts: FC = () => {
  const { isLoading, data } = useReleaseNotesQuery();
  const {
    search,
    selectedReleaseNoteTypes,
    filteredData: releaseNotes,
    releaseNotesYears,
  } = useReleaseNotes();

  if (isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  // Display this if no release posts are present whatsoever
  if (data?.length === 0) {
    return (
      <ContainerNoResults>
        <Typography group="heading" variant="h4" color="#3D3D3D">
          There are no posts at the moment
        </Typography>
      </ContainerNoResults>
    );
  }

  // Display this if there are release posts, but none of them match the current search/filter criterias
  if (releaseNotes?.length === 0) {
    return (
      <ContainerNoResults>
        <Typography group="heading" variant="h4" color="#3D3D3D">
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
        const releaseNotesInYear = releaseNotes?.filter(
          (releaseNote) =>
            releaseNote.createdDate &&
            yearValueToString(new Date(releaseNote.createdDate)) === year.value
        );

        if (releaseNotesInYear?.length === 0) return null;

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

              if (
                releaseNotesInMonth === undefined ||
                releaseNotesInMonth.length === 0
              ) {
                return null;
              }

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

export default ReleasePosts;
