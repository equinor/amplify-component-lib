import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

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

export const SurveyLinearScaleQuestion: FC<LinearScaleQuestion> = ({
  questionId,
  linearScaleConfig,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();
  const rangeAmount = linearScaleConfig.max - linearScaleConfig.min + 1;

  return (
    <Container $rangeAmount={rangeAmount}>
      <Typography>Strongly disagree</Typography>
      {Array.from({ length: rangeAmount }).map((_, index) => (
        <RadioWrapper key={`range-radio-${index}`}>
          <Typography variant="body_short">{index + 1}</Typography>
          <Radio
            name={`range-${questionId}`}
            label=""
            checked={
              currentAnswer?.numericAnswer === index + linearScaleConfig.min
            }
            onClick={() => {
              setCurrentAnswer({
                id: questionId,
                numericAnswer: index + linearScaleConfig.min,
              });
            }}
          />
        </RadioWrapper>
      ))}
      <Typography>Strongly agree</Typography>
    </Container>
  );
};
