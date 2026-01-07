import { FC } from 'react';

import { spacings } from 'src/atoms/style';
import { Checkbox } from 'src/molecules/SelectionControls/Checkbox/Checkbox';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import {
  SurveyMultipleChoiceQuestionDto,
  SurveyQuestionType,
} from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const SurveyMultipleChoiceQuestion: FC<
  SurveyMultipleChoiceQuestionDto
> = ({ options }) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      {options.map((option) => (
        <Checkbox
          key={option.id}
          label={option.label}
          checked={
            currentAnswer?.type === SurveyQuestionType.MULTIPLE_CHOICE &&
            currentAnswer.answerIds.includes(option.id)
          }
          onChange={(event) => {
            setCurrentAnswer((prevAnswers) => {
              const newAnswerIds =
                prevAnswers &&
                prevAnswers.type === SurveyQuestionType.MULTIPLE_CHOICE
                  ? prevAnswers.answerIds
                  : [];
              if (event.target.checked) {
                newAnswerIds.push(option.id);
              } else {
                const index = newAnswerIds.indexOf(option.id);
                if (index > -1) {
                  newAnswerIds.splice(index, 1);
                }
              }

              return {
                type: SurveyQuestionType.MULTIPLE_CHOICE,
                answerIds: newAnswerIds,
              };
            });
          }}
        />
      ))}
    </Container>
  );
};
