import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import {
  SurveyQuestionRangeAnswerDto,
  SurveyQuestionType,
  SurveyRangeQuestionDto,
} from '../../SurveyProvider.types';
import { Radio } from 'src/molecules/SelectionControls/Radio/Radio';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';

import styled from 'styled-components';

const RANGE_AMOUNT = 7;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto repeat(${RANGE_AMOUNT}, auto) auto;
  align-items: center;
  width: 100%;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SurveyRangeQuestion: FC<SurveyRangeQuestionDto> = ({
  questionId,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      <Typography>Strongly disagree</Typography>
      {Array.from({ length: RANGE_AMOUNT }).map((_, index) => (
        <RadioWrapper key={`range-radio-${index}`}>
          <Typography variant="body_short">{index + 1}</Typography>
          <Radio
            name={`range-${questionId}`}
            label=""
            checked={
              currentAnswer?.type === SurveyQuestionType.RANGE &&
              currentAnswer.value === index + 1
            }
            onClick={() => {
              setCurrentAnswer({
                type: SurveyQuestionType.RANGE,
                value: (index + 1) as SurveyQuestionRangeAnswerDto['value'],
              });
            }}
          />
        </RadioWrapper>
      ))}
      <Typography>Strongly agree</Typography>
    </Container>
  );
};
