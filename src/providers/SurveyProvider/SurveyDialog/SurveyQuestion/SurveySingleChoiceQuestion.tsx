import { FC } from 'react';

import { spacings } from 'src/atoms/style';
import { Radio } from 'src/molecules';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import {
  SurveyQuestionType,
  SurveySingleChoiceQuestionDto,
} from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const SurveySingleChoiceQuestion: FC<SurveySingleChoiceQuestionDto> = ({
  questionId,
  options,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      {options.map((option) => (
        <Radio
          key={option.id}
          label={option.label}
          name={`single-choice-${questionId}`}
          checked={
            currentAnswer?.type === SurveyQuestionType.SINGLE_CHOICE &&
            currentAnswer.answerId === option.id
          }
          onClick={() => {
            setCurrentAnswer(() => {
              return {
                type: SurveyQuestionType.SINGLE_CHOICE,
                answerId: option.id,
              };
            });
          }}
        />
      ))}
    </Container>
  );
};
