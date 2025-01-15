import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import { useReleaseNotesQuery } from '@equinor/subsurface-app-management';

import { ReleasePosts } from './ReleasePosts/ReleasePosts';
import {
  Content,
  LeftContainer,
  LoadingWrapper,
  ScrollWrapper,
  StyledDialog,
  Wrapper,
} from './ReleaseNotes.styles';
import { ReleaseNotesHeader } from './ReleaseNotesHeader';
import { TableOfContents } from 'src/organisms/TableOfContents/TableOfContents';
import { TableOfContentsProvider } from 'src/providers';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

interface ReleaseNotesProps {
  enabled?: boolean;
}

export const ReleaseNotes: FC<ReleaseNotesProps> = ({ enabled }) => {
  const { releaseNotesYears, setOpen, open } = useReleaseNotes();
  const { isLoading, data } = useReleaseNotesQuery({ enabled });

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleCloseModal} isDismissable>
      <ReleaseNotesHeader />
      {isLoading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <TableOfContentsProvider items={releaseNotesYears}>
          <ScrollWrapper>
            <Wrapper>
              <LeftContainer>
                <TableOfContents />
              </LeftContainer>
              <Content>
                <ReleasePosts posts={data} />
              </Content>
            </Wrapper>
          </ScrollWrapper>
        </TableOfContentsProvider>
      )}
    </StyledDialog>
  );
};
