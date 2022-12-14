import React, { FC, MouseEvent, useMemo, useState } from 'react';

import {
  Button,
  Card,
  Icon,
  Input as EDSInput,
  Menu,
  Typography,
} from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_forward,
  exit_to_app,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../../../types/Field';

import styled from 'styled-components';
const { spacings, elevation, colors } = tokens;

const Input = styled(EDSInput)`
  width: 80%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

const StyledCard = styled(Card)`
  width: 25rem;
  align-items: center;
  padding: ${spacings.comfortable.large};
  box-shadow: ${elevation.raised};
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ResultMenu = styled(Menu)`
  width: calc((25rem - 2 * ${spacings.comfortable.large}) * 0.8);
  box-shadow: ${elevation.raised};
`;

const ResultList = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

type MenuItemProps = { active?: boolean };
const MenuItem = styled(Menu.Item)<MenuItemProps>`
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
  }
  &:hover {
    background: ${colors.ui.background__medium.hex};
  }
  background-color: ${(props) =>
    props.active ? `${colors.ui.background__medium.hex}` : 'none'};
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
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
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  const openMenu = (e: MouseEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setAnchorEl(e.target);
      setOpen(true);
    }
  };

  const closeMenu = () => setOpen(false);

  const [searchText, setSearchText] = useState<string>('');

  const handleSelectField = () => {
    const currentSelected = availableFields.find(
      (item) => item.name === searchText
    );
    if (currentSelected) {
      onSelect(currentSelected);
    }
  };

  const options = useMemo(() => {
    if (searchText !== '')
      return availableFields.filter((option) =>
        option.name?.toLowerCase()?.includes(searchText.toLowerCase())
      );

    return availableFields;
  }, [availableFields, searchText]);

  return (
    <>
      <StyledCard data-testid="selectorCard">
        <Input
          value={searchText}
          placeholder="Search"
          rightAdornments={
            <>
              <Icon data={arrow_drop_down} size={18}></Icon>
            </>
          }
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearchText(e.target.value)
          }
          onClick={(
            e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>
          ) => openMenu(e)}
        />
        <Button
          data-testid="nextButton"
          variant="contained_icon"
          disabled={!availableFields.find((item) => item.name === searchText)}
          onClick={handleSelectField}
        >
          <Icon data={arrow_forward} />
        </Button>
      </StyledCard>

      <ResultMenu
        data-testid="resultMenu"
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        placement="bottom"
      >
        <ResultList>
          {options.map((field) => {
            return (
              <MenuItem
                key={field.uuid}
                onClick={() => setSearchText(field.name ?? '')}
                active={searchText === field.name}
              >
                <Typography group="navigation" variant="menu_title">
                  {field.name}
                </Typography>
              </MenuItem>
            );
          })}
        </ResultList>
        {showAccessITLink && (
          <MenuItem
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
          </MenuItem>
        )}
      </ResultMenu>
    </>
  );
};

export default SelectorCard;
