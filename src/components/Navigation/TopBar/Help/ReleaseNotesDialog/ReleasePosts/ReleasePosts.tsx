import { FC } from 'react';

import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ReleasePost from './ReleasePost';
import { useReleaseNotesQuery } from 'src/hooks/useReleaseNotesQuery';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import {
  monthToString,
  monthValueToString,
  yearValueToString,
} from 'src/utils/releaseNotes';

import styled from 'styled-components';

const { spacings, shape } = tokens;

const ContainerNoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 168px;
  border-radius: ${shape.corners.borderRadius};
  border: dotted 2px lightgray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  align-items: flex-start;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
`;

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

  if (releaseNotes?.length === 0) {
    if (releaseNotes?.length === 0) {
      return (
        <ContainerNoResults>
          <Typography group="heading" variant="h4" color="#3D3D3D">
            There are no posts at the moment
          </Typography>
        </ContainerNoResults>
      );
    } else {
      return (
        <ContainerNoResults>
          <Typography group="heading" variant="h4" color="#3D3D3D">
            Nothing matching {`" ${search} ${selectedReleaseNoteTypes} "`}
          </Typography>
        </ContainerNoResults>
      );
    }
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
              )
                return null;

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
