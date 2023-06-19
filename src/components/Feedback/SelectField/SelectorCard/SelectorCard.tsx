import React, { FC, useState } from 'react';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Card,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { arrow_forward, exit_to_app } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../../../types/Field';

import styled from 'styled-components';

const { spacings, elevation, colors, shape } = tokens;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

const StyledCard = styled(Card)`
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 60vh;
  min-height: 150px;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: auto;
  padding: ${spacings.comfortable.large};
  box-shadow: ${elevation.above_scrim};
  border-radius: ${shape.corners.borderRadius};
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  > h3 {
    color: ${colors.text.static_icons__default.hex};
    margin-bottom: ${spacings.comfortable.medium};
  }
  > section {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-end;
    grid-gap: ${spacings.comfortable.medium};
  }
`;

const AutocompleteWrapper = styled.div`
  * {
    background: none !important;
  }
  *:focus-within {
    outline: none !important;
  }
  input:focus {
    box-shadow: inset 0 -2px ${colors.interactive.primary__resting.hex};
  }
`;

const MissingAccess = styled.div`
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.hex};
    cursor: pointer;
  }
`;

export type FieldSelectorType = {
  availableFields: Array<Field>;
  onSelect: (selectedField: Field) => void;
  showAccessITLink?: boolean;
};

const SelectorCard: FC<FieldSelectorType> = ({
  availableFields,
  onSelect,
  showAccessITLink = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<Field>();

  const handleOnChange = (event: AutocompleteChanges<Field>) => {
    setSelectedOption(event.selectedItems[0]);
  };

  const handleSelectField = () => {
    if (selectedOption !== undefined) onSelect(selectedOption);
  };

  return (
    <StyledCard data-testid="selectorCard">
      <Typography variant="h3">Please select a field</Typography>
      <section>
        <AutocompleteWrapper>
          <Autocomplete
            autoWidth
            options={availableFields}
            label=""
            placeholder="Select a field"
            onOptionsChange={handleOnChange}
            optionLabel={(option) => option.name ?? ''}
          />
        </AutocompleteWrapper>
        <Button
          data-testid="nextButton"
          variant="contained_icon"
          disabled={selectedOption === undefined}
          onClick={handleSelectField}
        >
          <Icon data={arrow_forward} />
        </Button>
      </section>
      {showAccessITLink && (
        <MissingAccess
          data-testid="missing-access"
          onClick={() =>
            window.open('https://accessit.equinor.com/#', '_blank')
          }
        >
          <TextContainer>
            <Typography variant="overline">Missing a field?</Typography>
            <Typography variant="h6">Go to AccessIT</Typography>
          </TextContainer>
          <Icon
            data={exit_to_app}
            color={colors.interactive.primary__resting.hex}
            size={24}
          />
        </MissingAccess>
      )}
    </StyledCard>
  );
};

export default SelectorCard;
