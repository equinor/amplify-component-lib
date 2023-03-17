import React, { FC, useMemo, useState } from 'react';

import {
  Button,
  Card,
  Icon,
  Input as EDSInput,
  Typography,
} from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  arrow_forward,
  clear,
  exit_to_app,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../../../types/Field';

import styled from 'styled-components';

const { spacings, elevation, colors, shape } = tokens;

const Input = styled(EDSInput)`
  width: 80%;
  background: white;
`;

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
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  display: flex;
  flex-direction: column;
  > h3 {
    color: ${colors.text.static_icons__default.hex};
    margin-bottom: ${spacings.comfortable.medium};
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  gap: 0;
`;
type MenuProps = {
  open?: boolean;
};

const ResultMenu = styled.div<MenuProps>`
  width: calc((25rem - 2 * ${spacings.comfortable.large}) * 0.8);
  background-color: white;
  border-radius: ${shape.corners.borderRadius};
  height: ${(props) =>
    props.open
      ? `calc(
    60vh - 2 * ${spacings.comfortable.medium} - 2 *
      ${spacings.comfortable.large} - ${shape.button.minHeight} 
  )`
      : 0};
  transition: height 500ms;
  overflow: hidden;
  > div:first-child {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: calc(
      60vh - 2 * ${spacings.comfortable.medium} - 2 *
        ${spacings.comfortable.large} - ${shape.button.minHeight} - 30px - 73px
    );
  }
`;

type MenuItemProps = { active?: boolean };
const MenuItem = styled.div<MenuItemProps>`
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  &:hover {
    background: ${colors.interactive.primary__selected_highlight.hex};
    cursor: pointer;
  }
  background-color: ${(props) =>
    props.active ? `${colors.ui.background__medium.hex}` : 'none'};
`;

const MissingAccess = styled.div`
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  height: calc(${spacings.comfortable.medium} + 40px);
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: ${colors.interactive.primary__selected_highlight.hex};
    cursor: pointer;
  }

  border-top: 1px solid ${colors.infographic.primary__moss_green_55.hex};
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
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Field>();
  const [searchText, setSearchText] = useState<string>('');

  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  const handleOnClick = (option: Field) => {
    if (option.name !== selectedOption?.name) {
      setSelectedOption(option);
      setSearchText(option.name ?? '');
      closeMenu();
    } else {
      setSelectedOption(undefined);
      setSearchText('');
      closeMenu();
    }
  };

  const handleSelectField = () => {
    if (selectedOption !== undefined) onSelect(selectedOption);
  };

  const options = useMemo(() => {
    if (selectedOption === undefined) {
      if (searchText !== '') {
        return availableFields.filter((option) =>
          option.name?.toLowerCase()?.includes(searchText.toLowerCase())
        );
      }
      return availableFields;
    } else {
      if (searchText !== selectedOption.name) {
        setSelectedOption(undefined);
      }
      return availableFields;
    }
  }, [availableFields, searchText, selectedOption]);

  return (
    <div>
      <StyledCard data-testid="selectorCard">
        <Typography variant="h3">Please select a field</Typography>
        <div>
          <Input
            value={searchText}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setSearchText(e.target.value)}
            placeholder="Select a field"
            rightAdornments={
              <>
                {selectedOption && (
                  <Button
                    style={{ height: '24px', width: '24px' }}
                    variant="ghost_icon"
                    onClick={() => {
                      setSelectedOption(undefined);
                      setSearchText('');
                    }}
                  >
                    <Icon size={18} data={clear} />
                  </Button>
                )}
                <Button
                  style={{ height: '24px', width: '24px' }}
                  onClick={() => (open ? closeMenu() : openMenu())}
                  variant="ghost_icon"
                  data-testid="arrow_button"
                >
                  <Icon data={open ? arrow_drop_up : arrow_drop_down} />
                </Button>
              </>
            }
            onClick={openMenu}
          />
          <Button
            data-testid="nextButton"
            variant="contained_icon"
            disabled={selectedOption === undefined}
            onClick={handleSelectField}
          >
            <Icon data={arrow_forward} />
          </Button>
        </div>

        <ResultMenu data-testid="resultMenu" open={open}>
          <div>
            {options.map((field) => {
              return (
                <MenuItem
                  key={field.uuid}
                  onClick={() => handleOnClick(field)}
                  data-testid={`menu-item-${field.uuid}`}
                  active={selectedOption?.name === field.name}
                >
                  <Typography group="navigation" variant="menu_title">
                    {field.name}
                  </Typography>
                </MenuItem>
              );
            })}
          </div>
          {showAccessITLink && (
            <MissingAccess
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
        </ResultMenu>
      </StyledCard>
    </div>
  );
};

export default SelectorCard;
