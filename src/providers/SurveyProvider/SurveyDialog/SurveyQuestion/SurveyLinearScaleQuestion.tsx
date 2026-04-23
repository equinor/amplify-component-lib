import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { AnswerQuestionCommandDto } from '@equinor/subsurface-app-management';

import { Radio } from 'src/molecules/SelectionControls/Radio/Radio';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import { LinearScaleQuestion } from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

interface ContainerProps {
  $rangeAmount: number;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${({ $rangeAmount }) =>
    `auto repeat(${$rangeAmount}, auto) auto`};
  align-items: center;
  width: 100%;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ControlledSurveyLinearScaleQuestionProps extends LinearScaleQuestion {
  answer: AnswerQuestionCommandDto;
  setAnswer: (answer: AnswerQuestionCommandDto) => void;
}

type SurveyLinearScaleQuestionProps =
  | LinearScaleQuestion
  | ControlledSurveyLinearScaleQuestionProps;

export const SurveyLinearScaleQuestion: FC<SurveyLinearScaleQuestionProps> = ({
  questionId,
  linearScaleVm,
  ...rest
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();
  const rangeAmount = linearScaleVm.maxValue - linearScaleVm.minValue + 1;

  const handleOnAnswer = (numericAnswer: number) => {
    if ('answer' in rest && 'setAnswer' in rest) {
      rest.setAnswer({
        ...rest.answer,
        numericAnswer,
      });
    } else {
      setCurrentAnswer({
        id: questionId,
        numericAnswer,
      });
    }
  };

  return (
    <Container $rangeAmount={rangeAmount}>
      <Typography>{linearScaleVm.minLabel}</Typography>
      {Array.from({ length: rangeAmount }).map((_, index) => (
        <RadioWrapper key={`range-radio-${index}`}>
          <Typography variant="body_short">
            {linearScaleVm.minValue + index}
          </Typography>
          <Radio
            data-testid={`range-radio-${questionId.value}`}
            name={`range-${questionId.value}`}
            label=""
            checked={
              ('answer' in rest ? rest.answer : currentAnswer)
                ?.numericAnswer ===
              index + linearScaleVm.minValue
            }
            onClick={() => {
              handleOnAnswer(linearScaleVm.minValue + index);
            }}
          />
        </RadioWrapper>
      ))}
      <Typography>{linearScaleVm.maxLabel}</Typography>
    </Container>
  );
};
