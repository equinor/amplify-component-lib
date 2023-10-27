import { FC, useMemo } from 'react';

import { Dialog, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FilterHeader from './Filters/FilterHeader';
import FilterMonths from './Filters/FilterMonths';
import ReleasePosts from './ReleasePosts/ReleasePosts';
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
  padding: 0 ${spacings.comfortable.large};
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  min-width: calc(100% - 73px - 48px);
  padding-bottom: 50px;
  justify-content: center;
  display: grid;
  grid-template-columns: 2fr 5fr;
  column-gap: ${spacings.comfortable.xx_large};
`;
const LeftContainer = styled.div`
  // Remove padding when setting height
  height: calc(70vh - 48px);

  top: 0px;
  padding-top: ${spacings.comfortable.xxx_large};
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
  height: 85vh;
  grid-template-columns: 2 / 3;
  padding-right: ${spacings.comfortable.xx_large};
`;
const ScrollWrapper = styled.div`
  height: fit-content;
  overflow-y: auto;
  padding-bottom: ${spacings.comfortable.x_large};
`;

const HeadingContainer = styled.div`
  display: flex;
  padding-bottom: ${spacings.comfortable.xx_large};
`;

const FilterContainer = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  top: 0px;
  background-color: ${colors.ui.background__light.hex};
  margin: 0 -${spacings.comfortable.small};
  padding: 50px ${spacings.comfortable.small} ${spacings.comfortable.large};
  z-index: 100;
  height: auto;
  gap: ${spacings.comfortable.large};
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
      <PageMenuProvider items={pageMenuItems}>
        <Wrapper>
          <LeftContainer>
              <HeadingContainer>
                <Typography group="heading" variant="h4">
                  Release Notes
                </Typography>
              </HeadingContainer>
            <ScrollWrapper>
              <FilterMonths />
            </ScrollWrapper>
          </LeftContainer>
          <Content>
            <FilterContainer>
              <FilterHeader />
            </FilterContainer>
            <ScrollWrapper>
              <ReleasePosts />
            </ScrollWrapper>
          </Content>
        </Wrapper>
      </PageMenuProvider>
    </StyledDialog>
  );
};

export default ReleaseNotes;
