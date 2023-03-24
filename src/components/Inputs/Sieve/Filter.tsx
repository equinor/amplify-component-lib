import { FC, MouseEvent, useRef, useState } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import {
  arrow_drop_right,
  checkbox,
  checkbox_outline,
  filter_list,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { Chip, MenuItem, Option } from './Sieve.common';

const { colors } = tokens;

export type FilterOption = {
  label: string;
  options: Option[];
};

interface FilterProps {
  options: FilterOption[];
  selectedOptions: Option[];
  setSelectedOptions: (values: Option[]) => void;
}

const Filter: FC<FilterProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const subMenuRef = useRef<HTMLDivElement | null>(null);
  const [subMenuIndex, setSubMenuIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  useOutsideClick(anchorRef.current as HTMLElement, (event) => {
    if (
      subMenuAnchor === null &&
      open &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    } else if (
      open &&
      subMenuAnchor !== null &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      setSubMenuIndex(-1);
      setSubMenuAnchor(null);
    }
  });

  const handleChipClick = () => {
    setOpen(!open);
    setSubMenuIndex(-1);
    setSubMenuAnchor(null);
  };

  const handleMenuItemClick = (event: MouseEvent<Element>, index: number) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(-1);
      setSubMenuAnchor(null);
    } else {
      setSubMenuIndex(index);
      setSubMenuAnchor(event.currentTarget as HTMLButtonElement);
    }
  };

  const handleFilterOptionClick = (option: Option) => {
    let newValues = [...selectedOptions, option];
    if (selectedOptions.map((i) => i.value).includes(option.value)) {
      newValues = selectedOptions.filter((item) => item.value !== option.value);
    }
    setSelectedOptions(newValues);
  };

  if (options.length === 0) return null;

  return (
    <>
      <Chip ref={anchorRef} onClick={handleChipClick}>
        Filter by <Icon data={filter_list} />
      </Chip>
      {open && (
        <Menu
          open
          ref={menuRef}
          anchorEl={anchorRef.current}
          placement="bottom-start"
        >
          <Menu.Section title="Filter by">
            {options.map((option, index) => (
              <MenuItem
                key={`filter-menu-item-${option.label}`}
                active={subMenuIndex === index}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option.label}
                <Icon
                  data={arrow_drop_right}
                  color={colors.text.static_icons__tertiary.hex}
                />
              </MenuItem>
            ))}
          </Menu.Section>
        </Menu>
      )}

      {subMenuIndex !== -1 && (
        <Menu
          open
          anchorEl={subMenuAnchor}
          ref={subMenuRef}
          placement="right-start"
        >
          <Menu.Section title={options[subMenuIndex].label}>
            {options[subMenuIndex]?.options.map((option) => (
              <MenuItem
                key={`filter-option-${option.label}`}
                onClick={() => handleFilterOptionClick(option)}
              >
                {option.label}
                <Icon
                  data={
                    selectedOptions
                      .map((item) => item.value)
                      .includes(option.value)
                      ? checkbox
                      : checkbox_outline
                  }
                  color={colors.interactive.primary__resting.hex}
                />
              </MenuItem>
            ))}
          </Menu.Section>
        </Menu>
      )}
    </>
  );
};

export default Filter;
