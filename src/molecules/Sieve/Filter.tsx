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

import { Chip, MenuItem } from 'src/molecules/Sieve/Sieve.styles';
import { FilterValues, SieveOption } from 'src/molecules/Sieve/Sieve.types';

const { colors } = tokens;

export interface SieveFilterGroup {
  label: string;
  options: SieveOption[];
}

interface FilterProps {
  options: SieveFilterGroup[];
  filterValues: FilterValues | undefined;
  setFilterValues: (values: FilterValues | undefined) => void;
}

const Filter: FC<FilterProps> = ({
  options,
  filterValues,
  setFilterValues,
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

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(-1);
      setSubMenuAnchor(null);
    } else {
      setSubMenuIndex(index);
      setSubMenuAnchor(event.currentTarget as HTMLButtonElement);
    }
  };

  const handleFilterOptionClick = (parent: string, option: SieveOption) => {
    let newValues: FilterValues | undefined = { ...filterValues };

    if (
      parent in newValues &&
      newValues[parent].some((item) => item.value === option.value)
    ) {
      const index = newValues[parent].findIndex(
        (item) => item.value === option.value
      );
      newValues[parent].splice(index, 1);
      if (newValues[parent].length === 0) {
        delete newValues[parent];
      }
    } else if (newValues[parent]) {
      newValues[parent].push(option);
    } else {
      newValues[parent] = [option];
    }

    if (
      Object.keys(newValues).flatMap((parent) => newValues?.[parent]).length ===
      0
    ) {
      newValues = undefined;
    }

    setFilterValues(newValues);
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
                onClick={(event: MouseEvent) =>
                  handleMenuItemClick(event, index)
                }
              >
                {option.label}
                <Icon
                  data={arrow_drop_right}
                  color={colors.text.static_icons__tertiary.rgba}
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
                onClick={() =>
                  handleFilterOptionClick(options[subMenuIndex].label, option)
                }
              >
                {option.label}
                <Icon
                  data={
                    filterValues?.[options[subMenuIndex].label]?.some(
                      (item) => item.value === option.value
                    )
                      ? checkbox
                      : checkbox_outline
                  }
                  color={colors.interactive.primary__resting.rgba}
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
