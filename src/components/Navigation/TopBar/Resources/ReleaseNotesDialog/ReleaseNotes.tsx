import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';

import { TableOfContents } from '../../../TableOfContents/TableOfContents';
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
import { useReleaseNotesQuery } from 'src/hooks';
import { TableOfContentsProvider } from 'src/providers';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

interface ReleaseNotesProps {
  enabled?: boolean;
}

const ReleaseNotes: FC<ReleaseNotesProps> = ({ enabled }) => {
  const { releaseNotesYears, setOpen, open } = useReleaseNotes();
  const { isLoading, data } = useReleaseNotesQuery({ enabled });
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

export default ReleaseNotes;
