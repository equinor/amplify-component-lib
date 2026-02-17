import { FC } from 'react';

import { spacings } from 'src/atoms/style';
import { Checkbox } from 'src/molecules/SelectionControls/Checkbox/Checkbox';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';
import { ChoiceQuestion } from 'src/providers/SurveyProvider/SurveyProvider.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const SurveyMultipleChoiceQuestion: FC<ChoiceQuestion> = ({
  questionId,
  options,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();

  return (
    <Container>
      {options?.map((option) => (
        <Checkbox
          key={option.id.value}
          label={option.optionText}
          checked={currentAnswer?.selectedOptionIds?.some(
            (item) => item.value === option.id.value
          )}
          onChange={(event) => {
            setCurrentAnswer((prevAnswer) => {
              const newSelectedOptionIds =
                (prevAnswer && prevAnswer.selectedOptionIds) ?? [];
              if (event.target.checked) {
                newSelectedOptionIds.push(option.id);
              } else {
                const index = newSelectedOptionIds.findIndex(
                  (item) => item.value === option.id.value
                );
                if (index > -1) {
                  newSelectedOptionIds.splice(index, 1);
                }
              }

              return {
                ...prevAnswer,
                id: questionId,
                selectedOptionIds: newSelectedOptionIds,
              };
            });
          }}
        />
      ))}
    </Container>
  );
};
