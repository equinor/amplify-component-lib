import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';

import { useTokenReleaseNote } from './ReleasePosts/hooks/useTokenReleaseNote';
import ReleasePosts from './ReleasePosts/ReleasePosts';
import {
  Content,
  LeftContainer,
  LoadingWrapper,
  ScrollWrapper,
  StyledDialog,
  Wrapper,
} from './ReleaseNotes.styles';
import ReleaseNotesHeader from './ReleaseNotesHeader';
import PageMenu from 'src/components/Navigation/PageMenu/PageMenu';
import { useReleaseNotesQuery } from 'src/hooks';
import { PageMenuProvider } from 'src/providers';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

const ReleaseNotes: FC = () => {
  const { releaseNotesYears, setOpen, open } = useReleaseNotes();
  const { isLoading, data } = useReleaseNotesQuery();
  const { data: token } = useTokenReleaseNote();

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleCloseModal} isDismissable>
      <ReleaseNotesHeader />
      {isLoading || token === undefined ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <PageMenuProvider items={releaseNotesYears}>
          <ScrollWrapper>
            <Wrapper>
              <LeftContainer>
                <PageMenu />
              </LeftContainer>
              <Content>
                <ReleasePosts posts={data} />
              </Content>
            </Wrapper>
          </ScrollWrapper>
        </PageMenuProvider>
      )}
    </StyledDialog>
  );
};

export default ReleaseNotes;
