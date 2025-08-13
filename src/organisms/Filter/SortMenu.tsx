import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import {
  radio_button_selected,
  radio_button_unselected,
  sort,
} from '@equinor/eds-icons';

import { ButtonWithMenu } from './ButtonWithMenu';
import { colors } from 'src/atoms/style';

import styled from 'styled-components';

const MenuItem = styled(Menu.Item)`
  > div {
    grid-template-columns: 1fr auto;
  }
`;

interface SortMenuProps<S> {
  value: S;
  onChange: (value: S) => void;
  items: { value: S; label: string }[];
}

export function SortMenu<S>({ value, onChange, items }: SortMenuProps<S>) {
  const activeSorting = items.find((item) => item.value === value);

  const handleOnSelect = (value: S) => {
    onChange(value);
  };

  return (
    <ButtonWithMenu
      menuItems={items.map((item) => (
        <MenuItem
          key={item.label}
          onClick={() => {
            handleOnSelect(item.value);
          }}
        >
          {item.label}
          <Icon
            color={
              item.value === value
                ? colors.interactive.primary__resting.rgba
                : colors.text.static_icons__tertiary.rgba
            }
            data={
              item.value === value
                ? radio_button_selected
                : radio_button_unselected
            }
          />
        </MenuItem>
      ))}
    >
      <Typography as="span" variant="button" group="navigation">
        Sort by {activeSorting?.label}
      </Typography>
      <Icon data={sort} />
    </ButtonWithMenu>
  );
}
