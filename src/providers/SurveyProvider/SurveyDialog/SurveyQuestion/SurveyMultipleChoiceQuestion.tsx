import { FC } from 'react';

import { spacings } from 'src/atoms/style';
import { Checkbox } from 'src/molecules/SelectionControls/Checkbox/Checkbox';
import { Radio } from 'src/molecules/SelectionControls/Radio/Radio';
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
  multipleChoiceVm,
}) => {
  const { currentAnswer, setCurrentAnswer } = useSurvey();
  const isSingleSelect = multipleChoiceVm.maxSelectableOptions === 1;

  return (
    <Container>
      {multipleChoiceVm.options.map((option) => {
        const checked = currentAnswer?.selectedOptionIds?.some(
          (item) => item.value === option.id.value
        );

        if (isSingleSelect) {
          return (
            <Radio
              key={option.id.value}
              name={`survey-multiple-choice-${questionId.value}`}
              label={option.optionText}
              checked={checked}
              onChange={() => {
                setCurrentAnswer((prevAnswer) => ({
                  ...prevAnswer,
                  id: questionId,
                  selectedOptionIds: [option.id],
                }));
              }}
            />
          );
        }

        return (
          <Checkbox
            key={option.id.value}
            label={option.optionText}
            checked={checked}
            disabled={
              !checked &&
              multipleChoiceVm.maxSelectableOptions ===
                (currentAnswer?.selectedOptionIds?.length ?? 0)
            }
            onChange={(event) => {
              setCurrentAnswer((prevAnswer) => {
                const newSelectedOptionIds = [
                  ...((prevAnswer && prevAnswer.selectedOptionIds) ?? []),
                ];
                if (event.target.checked) {
                  newSelectedOptionIds.push(option.id);
                } else {
                  const index = newSelectedOptionIds.findIndex(
                    (item) => item.value === option.id.value
                  );
                  newSelectedOptionIds.splice(index, 1);
                }

                return {
                  ...prevAnswer,
                  id: questionId,
                  selectedOptionIds: newSelectedOptionIds,
                };
              });
            }}
          />
        );
      })}
    </Container>
  );
};
