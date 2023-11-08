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

interface ReleaseNotesProps {
  setShow: (show: boolean) => void;
  show: boolean;
}

const ReleaseNotes: FC<ReleaseNotesProps> = ({ setShow, show }) => {
  const { releaseNotesYears } = useReleaseNotes();

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
    <StyledDialog open={show} onClose={() => setShow(false)} isDismissable>
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
