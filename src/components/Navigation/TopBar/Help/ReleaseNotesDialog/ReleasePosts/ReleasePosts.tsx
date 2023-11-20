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
import {
  monthToString,
  monthValueToString,
  yearValueToString,
} from 'src/utils/releaseNotes';

const ReleasePosts: FC = () => {
  const { isLoading } = useReleaseNotesQuery();
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

  return (
    <Container>
      {releaseNotesYears?.map((year) => {
        const releaseNotesInYear = releaseNotes?.filter(
          (releaseNote) =>
            releaseNote.createdDate &&
            yearValueToString(new Date(releaseNote.createdDate)) ===
              yearValueToString(new Date(year.value))
        );

        if (releaseNotesInYear?.length === 0) return null;

        return (
          <Container key={`year-${year.value}`}>
            <Typography variant="h4">{year.value}</Typography>
            {year.months.flatMap((month) => {
              const releaseNotesInMonth = releaseNotes?.filter(
                (releaseNote) =>
                  releaseNote.createdDate &&
                  monthValueToString(new Date(releaseNote.createdDate)) ===
                    monthValueToString(month.value)
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
                  id={monthValueToString(month.value)}
                >
                  {monthToString(month.value)}
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
