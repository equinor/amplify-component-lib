import { ChangeEvent, FC } from 'react';

import { spacings } from 'src/atoms/style';
import { TextField } from 'src/molecules/TextField/TextField';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import {
  SurveyFreeTextQuestionDto,
  SurveyQuestionType,
} from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const SurveyFreeTextQuestion: FC<SurveyFreeTextQuestionDto> = ({
  questionId,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      <TextField
        id={`free-text-${questionId}`}
        value={
          currentAnswer?.type === SurveyQuestionType.FREE_TEXT
            ? currentAnswer.text
            : ''
        }
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCurrentAnswer({
            type: SurveyQuestionType.FREE_TEXT,
            text: event.target.value,
          });
        }}
      />
    </Container>
  );
};
