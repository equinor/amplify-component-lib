import { type FC, Fragment } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { ReleasePost } from './ReleasePost/ReleasePost';
import { ReleasePostSkeleton } from './ReleasePost/ReleasePostSkeleton';
import { spacings } from 'src/atoms/style';
import { useFilteredReleaseNotes } from 'src/organisms/ReleaseNotesPage/hooks/useFilteredReleaseNotes';
import { monthValueToString } from 'src/organisms/ReleaseNotesPage/ReleaseNotesPage.utils';
import { Status } from 'src/organisms/Status';
import { useTableOfContents } from 'src/providers/TableOfContentsProvider';

import styled from 'styled-components';

const AlternativeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.large};
  align-items: flex-start;
  width: 100%;
  > h3 {
    margin: ${spacings.medium} 0;
  }
`;

export const ReleasePosts: FC = () => {
  const {
    data: releaseNotes,
    isLoading,
    isSearchingOrFiltering,
  } = useFilteredReleaseNotes();
  const { items } = useTableOfContents();

  if (releaseNotes.length === 0 && !isLoading) {
    return (
      <AlternativeContainer>
        <Status center={false}>
          <Status.Title
            title={`No release notes ${isSearchingOrFiltering ? 'found' : 'yet'}`}
          />
        </Status>
      </AlternativeContainer>
    );
  }

  return (
    <Container>
      {isLoading
        ? Array.from({ length: 20 })
            .fill(0)
            .map((_, index) => (
              <ReleasePostSkeleton
                key={`release-post-skeleton-${index.toString()}`}
              />
            ))
        : items.map((tocItem) => (
            <Fragment key={tocItem.value}>
              <Typography variant="h3" id={tocItem.value}>
                {tocItem.label}
              </Typography>
              {tocItem.children?.map((child) => {
                const releaseNotesInMonth = releaseNotes.filter(
                  (releaseNote) =>
                    monthValueToString(
                      new Date(
                        releaseNote.releaseDate ?? releaseNote.createdDate
                      )
                    ) === child.value
                );

                return (
                  <Fragment key={child.value}>
                    <Typography variant="h4" id={child.value}>
                      {child.label}
                    </Typography>
                    {releaseNotesInMonth.map((releaseNote) => (
                      <ReleasePost
                        key={releaseNote.releaseId}
                        {...releaseNote}
                      />
                    ))}
                  </Fragment>
                );
              })}
            </Fragment>
          ))}
    </Container>
  );
};
