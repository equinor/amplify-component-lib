import { FC } from 'react';

import ReleasePosts from './ReleasePosts/ReleasePosts';
import {
  Content,
  LeftContainer,
  ScrollWrapper,
  StyledDialog,
  Wrapper,
} from './ReleaseNotes.styles';
import ReleaseNotesHeader from './ReleaseNotesHeader';
import PageMenu from 'src/components/Navigation/PageMenu/PageMenu';
import { PageMenuProvider } from 'src/providers';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

const ReleaseNotes: FC = () => {
  const { releaseNotesYears, setOpen, open } = useReleaseNotes();

  return (
    <StyledDialog open={open} onClose={() => setOpen(false)} isDismissable>
      <ReleaseNotesHeader />
      <PageMenuProvider items={releaseNotesYears}>
        <ScrollWrapper>
          <Wrapper>
            <LeftContainer>
              <PageMenu />
            </LeftContainer>
            <Content>
              <ReleasePosts />
            </Content>
          </Wrapper>
        </ScrollWrapper>
      </PageMenuProvider>
    </StyledDialog>
  );
};

export default ReleaseNotes;
