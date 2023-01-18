import React, { FC, useMemo, useRef, useState } from 'react';

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
import { useOutsideClick } from '@equinor/eds-utils';

import { Field } from '../../../../types/Field';

import styled from 'styled-components';
const { spacings, elevation, colors, shape } = tokens;

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

const ResultMenu = styled.div`
  position: absolute;
  left: 24px;
  top: calc(
    ${spacings.comfortable.large} + ${spacings.comfortable.medium_small} + 2 *
      ${shape.icon_button.minHeight}
  );
  width: calc((25rem - 2 * ${spacings.comfortable.large}) * 0.8);
  box-shadow: ${elevation.raised};
  background-color: white;
  border-radius: ${shape.corners.borderRadius};
`;

const ResultList = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

type MenuItemProps = { active?: boolean };
const MenuItem = styled.div<MenuItemProps>`
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_highlight.hex};
    cursor: pointer;
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
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Field>();
  const [searchText, setSearchText] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  useOutsideClick(containerRef.current as HTMLElement, (event: MouseEvent) => {
    const node = event.target as Node;
    if (
      open &&
      menuRef.current &&
      !menuRef.current.contains(node) &&
      !inputRef.current?.contains(node)
    ) {
      closeMenu();
    }
  });

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
    <div ref={containerRef}>
      <StyledCard data-testid="selectorCard">
        <Input
          ref={inputRef}
          value={searchText}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearchText(e.target.value)
          }
          placeholder="Select"
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
      </StyledCard>

      {open && (
        <ResultMenu data-testid="resultMenu" ref={menuRef}>
          <ResultList>
            {options.map((field) => {
              return (
                <MenuItem
                  key={field.uuid}
                  onClick={() => handleOnClick(field)}
                  active={selectedOption?.name === field.name}
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
              <div>
                <TextContainer>
                  <Typography variant="overline">Missing a field?</Typography>
                  <Typography variant="h6">Go to AccessIT</Typography>
                </TextContainer>
                <Icon
                  data={exit_to_app}
                  color={colors.interactive.primary__resting.hex}
                  size={24}
                />
              </div>
            </MenuItem>
          )}
        </ResultMenu>
      )}
    </div>
  );
};

export default SelectorCard;
