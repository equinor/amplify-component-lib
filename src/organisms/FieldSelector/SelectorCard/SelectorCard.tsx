import React, { FC, useMemo, useState } from 'react';

import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';

import { colors, elevation, shape, spacings } from 'src/atoms/style';
import { Field } from 'src/atoms/types/Field';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';

import styled from 'styled-components';

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
  color: ${colors.text.static_icons__default.rgba};
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

type SelectFieldOption = Field & SelectOptionRequired;

export interface FieldSelectorType {
  availableFields: Field[];
  onSelect: (selectedField: Field) => void;
  itemNameSingular: string;
  showAccessITLink?: boolean;
}

export const SelectorCard: FC<FieldSelectorType> = ({
  availableFields,
  onSelect,
  itemNameSingular,
  showAccessITLink = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectFieldOption>();

  const handleSelectField = () => {
    if (selectedOption !== undefined)
      onSelect({
        name: selectedOption.name,
        uuid: selectedOption.uuid,
        country: selectedOption.country,
      });
  };

  const handleOnSelect = (selectedOption: SelectFieldOption | undefined) => {
    setSelectedOption(selectedOption);
  };

  const options: SelectFieldOption[] = useMemo(() => {
    const all = [];
    for (const field of availableFields) {
      if (!field.name) {
        console.error('Field with no name found!:', field);
      } else {
        all.push({ label: field.name, value: field.name, ...field });
      }
    }
    return all;
  }, [availableFields]);

  return (
    <StyledCard>
      <Typography variant="h3">Please select a {itemNameSingular}</Typography>
      <div>
        <section>
          <SingleSelect
            lightBackground
            value={selectedOption}
            items={options}
            placeholder={`Select a ${itemNameSingular}...`}
            onSelect={handleOnSelect}
          />
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
            <Typography variant="overline">
              Missing a {itemNameSingular}?
            </Typography>
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
