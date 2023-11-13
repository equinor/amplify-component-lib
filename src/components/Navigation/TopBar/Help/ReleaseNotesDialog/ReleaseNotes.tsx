import { FC, useMemo } from 'react';

import FilterMonths from './Filters/FilterMonths';
import ReleasePosts from './ReleasePosts/ReleasePosts';
import {
  Content,
  LeftContainer,
  ScrollWrapper,
  StyledDialog,
  Wrapper,
} from './ReleaseNotes.styles';
import ReleaseNotesHeader from './ReleaseNotesHeader';
import { PageMenuProvider } from 'src/providers';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { monthValueToString } from 'src/utils/releaseNotes';

const ReleaseNotes: FC = () => {
  const { releaseNotesYears, setOpen, open } = useReleaseNotes();

  const pageMenuItems = useMemo(() => {
    return (
      releaseNotesYears?.flatMap((year) => {
        return year.months.map((yearMonth) => ({
          value: monthValueToString(yearMonth.value),
          label: monthValueToString(yearMonth.value),
        }));
      }) ?? []
    );
  }, [releaseNotesYears]);

  return (
    <StyledDialog open={open} onClose={() => setOpen(false)} isDismissable>
      <ReleaseNotesHeader />
      <PageMenuProvider items={pageMenuItems}>
        <ScrollWrapper>
          <Wrapper>
            <LeftContainer>
              <FilterMonths />
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
