import { FC, useMemo } from 'react';

import {
  Button,
  Container,
  MonthContainer,
  YearContainer,
} from './FilterMonths.styles';
import { usePageMenu } from 'src/hooks';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { monthValueToString } from 'src/utils/releaseNotes';

const FilterMonths: FC = () => {
  const { selected, setSelected } = usePageMenu();
  const { releaseNotesYears } = useReleaseNotes();

  const openYearValue = useMemo(() => {
    if (selected) {
      return new Date(selected).getFullYear().toString();
    }
  }, [selected]);

  const handleMonthClick = (monthValue: Date) => {
    setSelected(monthValueToString(monthValue));
  };

  const handleYearClick = (index: number) => {
    if (
      releaseNotesYears?.[index] &&
      releaseNotesYears[index].months.length > 0
    ) {
      setSelected(monthValueToString(releaseNotesYears[index].months[0].value));
    }
  };

  return (
    <>
      {releaseNotesYears?.map((year, index) => (
        <Container key={year.value}>
          <YearContainer>
            <Button
              color="primary"
              variant="ghost"
              onClick={() => handleYearClick(index)}
              $isActive={year.value === openYearValue}
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
                  $isActive={selected === monthValueToString(month.value)}
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
