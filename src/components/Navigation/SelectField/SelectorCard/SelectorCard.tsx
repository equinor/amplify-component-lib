import React, { FC, useMemo, useState } from 'react';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Card,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';
import { Field } from 'src/atoms/types/Field';

import styled from 'styled-components';

const { elevation, colors, shape } = tokens;

const StyledCard = styled(Card)`
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 60vh;
  min-height: 150px;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: auto;
  padding: ${spacings.large};
  box-shadow: ${elevation.above_scrim};
  border-radius: ${shape.corners.borderRadius};
  display: flex;
  flex-direction: column;
  gap: ${spacings.large};
  > h3 {
    color: ${colors.text.static_icons__default.rgba};
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: ${spacings.large};
    section {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: flex-end;
      grid-gap: ${spacings.medium};
    }
  }
`;

const AutocompleteWrapper = styled.div`
  * {
    background: none !important;
    color: ${colors.text.static_icons__default.rgba};
  }
  *:focus-within {
    outline: none !important;
  }
  input:focus {
    box-shadow: inset 0 -2px ${colors.interactive.primary__resting.rgba};
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  > h6 {
    text-transform: capitalize;
  }
`;
const GoToAccessItLink = styled.a`
  padding: ${spacings.small} ${spacings.medium};
  transition: background-color 200ms ease;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  border-radius: ${shape.corners.borderRadius};
  text-decoration: none;
  &:visited {
    color: inherit;
  }
  &:focus-within {
    outline: ${colors.interactive.primary__resting.rgba} dashed 2px;
  }
  &:active {
    outline: 0;
    background-color: ${colors.interactive.primary__selected_highlight.rgba};
  }
  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
    cursor: pointer;
  }
`;

type StrictField = {
  name: string;
} & Field;

export interface FieldSelectorType {
  availableFields: Field[];
  onSelect: (selectedField: Field) => void;
  showAccessITLink?: boolean;
}

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

  const options = useMemo(() => {
    const all: StrictField[] = [];
    for (const field of availableFields) {
      if (!field.name) {
        console.error('Field with no name found!:', field);
      } else {
        all.push(field as StrictField);
      }
    }
    return all;
  }, [availableFields]);

  return (
    <StyledCard>
      <Typography variant="h3">Please select a field</Typography>
      <div>
        <section>
          <AutocompleteWrapper>
            <Autocomplete
              autoWidth
              options={options}
              label=""
              placeholder="Select a field"
              onOptionsChange={handleOnChange}
              optionLabel={(option) => option.name}
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
          <LinkContainer>
            <Typography variant="overline">Missing a field?</Typography>
            <GoToAccessItLink
              tabIndex={0}
              data-testid="missing-access"
              href="https://accessit.equinor.com/#"
              target="_blank"
            >
              Go to AccessIT
            </GoToAccessItLink>
          </LinkContainer>
        )}
      </div>
    </StyledCard>
  );
};

export default SelectorCard;
