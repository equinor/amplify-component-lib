import { FC, useMemo } from 'react';

import { Dialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FilterMonths from './Filters/FilterMonths';
import ReleasePosts from './ReleasePosts/ReleasePosts';
import ReleaseNotesHeader from './ReleaseNotesHeader';
import { useReleaseNoteYears } from 'src/hooks';
import { PageMenuProvider } from 'src/providers';
import { monthValueToString } from 'src/utils/releaseNotes';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const StyledDialog = styled(Dialog)`
  background-color: ${colors.ui.background__light.hex};
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  padding-left: ${spacings.comfortable.large}; // Due to where we've put the scroll bar, we will fix the right padding in a different element
  overflow: hidden;
`;

const Wrapper = styled.div`
  min-width: calc(100% - 73px - 48px);
  padding-bottom: 64px;
  justify-content: center;
  display: flex;
  column-gap: ${spacings.comfortable.xx_large};
`;

const LeftContainer = styled.div`
  // Remove padding when setting height
  height: calc(70vh - 48px);

  top: 0px;
  position: sticky;
  height: fit-content;
  grid-column: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  > div {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    @media (max-width: 1000px) {
      max-width: 150px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${spacings.comfortable.xx_large};
`;
const ScrollWrapper = styled.div`
  height: fit-content;
  overflow-y: auto;
  padding-bottom: ${spacings.comfortable.xxx_large};
`;



interface ReleaseNotesProps {
  setShow: (show: boolean) => void;
  show: boolean;
}

const ReleaseNotes: FC<ReleaseNotesProps> = ({ setShow, show }) => {
  const yearsData = useReleaseNoteYears();

  const pageMenuItems = useMemo(() => {
    return (
      yearsData?.flatMap((year) => {
        return year.months.map((yearMonth) => ({
          value: monthValueToString(yearMonth.value),
          label: monthValueToString(yearMonth.value),
        }));
      }) ?? []
    );
  }, [yearsData]);

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
