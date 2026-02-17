import { ChangeEvent, FC } from 'react';

import { spacings } from 'src/atoms/style';
import { TextField } from 'src/molecules/TextField/TextField';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import { FreeTextQuestion } from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const SurveyFreeTextQuestion: FC<FreeTextQuestion> = ({
  questionId,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      <TextField
        id={`free-text-${questionId}`}
        value={currentAnswer?.textAnswer ?? ''}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCurrentAnswer({
            id: questionId,
            textAnswer: event.target.value,
          });
        }}
      />
    </Container>
  );
};
