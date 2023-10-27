import { FC, useMemo } from 'react';

import { Button as EDSButton } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { usePageMenu } from 'src/hooks';
import { useReleaseNoteYears } from 'src/hooks/useReleaseNoteYears';
import { monthValueToString } from 'src/utils/releaseNotes';

import styled from 'styled-components';

const { spacings } = tokens;

interface ButtonProps {
  isActive?: boolean;
}

const Button = styled(EDSButton)<ButtonProps>`
  color: black;
  font-weight: 700;
  background-color: ${(props) => (props.isActive ? '#deedee' : 'none')};
  margin-bottom: ${spacings.comfortable.medium};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: sticky;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 40px;
`;

const YearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FilterMonths: FC = () => {
  const { selected, setSelected } = usePageMenu();

  const yearsData = useReleaseNoteYears();

  const openYearValue = useMemo(() => {
    if (selected) {
      return new Date(selected).getFullYear().toString();
    }
  }, [selected]);

  const handleMonthClick = (monthValue: Date) => {
    setSelected(monthValueToString(monthValue));
  };

  const handleYearClick = (index: number) => {
    if (yearsData?.[index] && yearsData[index].months.length > 0) {
      setSelected(monthValueToString(yearsData[index].months[0].value));
    }
  };

  return (
    <>
      {yearsData?.map((year, index) => (
        <Container key={year.value}>
          <YearContainer>
            <Button
              color="primary"
              variant="ghost"
              onClick={() => handleYearClick(index)}
              isActive={year.value === openYearValue}
            >
              {year.label}
            </Button>
          </YearContainer>
          {year.value === openYearValue && (
            <MonthContainer>
              {year.months.map((month) => (
                <Button
                  key={month.value.toISOString()}
                  variant="ghost"
                  onClick={() => handleMonthClick(month.value)}
                  isActive={selected === monthValueToString(month.value)}
                >
                  {month.label}
                </Button>
              ))}
            </MonthContainer>
          )}
        </Container>
      ))}
    </>
  );
};

export default FilterMonths;
