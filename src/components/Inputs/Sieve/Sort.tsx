import { FC, useRef, useState } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import {
  radio_button_selected,
  radio_button_unselected,
  sort,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Chip, MenuItem, Option } from './Sieve.common';

const { colors } = tokens;

interface SortProps {
  options: Option[];
  selectedOption: Option | undefined;
  setSelectedOption: (value: Option) => void;
}

const Sort: FC<SortProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleChipClick = () => {
    setOpen(!open);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnClick = (option: Option) => {
    setSelectedOption(option);
  };

  if (options.length === 0) return null;

  return (
    <>
      <Chip ref={anchorRef} onClick={handleChipClick}>
        Sort by <Icon data={sort} />
      </Chip>
      {open && (
        <Menu
          open
          anchorEl={anchorRef.current}
          onClose={handleOnClose}
          placement="bottom-start"
        >
          <Menu.Section title="Sort by">
            {options.map((option) => (
              <MenuItem
                key={`sort-item-${option.value}`}
                onClick={() => handleOnClick(option)}
              >
                {option.label}
                <Icon
                  data={
                    selectedOption?.value === option.value
                      ? radio_button_selected
                      : radio_button_unselected
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

export default Sort;
