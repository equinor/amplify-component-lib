import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import {
  radio_button_selected,
  radio_button_unselected,
  sort,
} from '@equinor/eds-icons';

import { ButtonWithMenu } from './ButtonWithMenu';
import { colors } from 'src/atoms';
import { SortingProps } from 'src/organisms/Filter/Filter.types';

import styled from 'styled-components';

const MenuItem = styled(Menu.Item)`
  > div {
    grid-template-columns: 1fr auto;
  }
`;

export function Sorting<S>({
  sortValue,
  onSortChange,
  sortItems,
}: SortingProps<S>) {
  const activeSorting = sortItems.find((item) => item.value === sortValue);

  const handleOnSelect = (value: S) => {
    onSortChange(value);
  };

  return (
    <ButtonWithMenu
      menuItems={sortItems.map((item) => (
        <MenuItem
          key={item.label}
          onClick={() => {
            handleOnSelect(item.value);
          }}
        >
          {item.label}
          <Icon
            color={
              item.value === sortValue
                ? colors.interactive.primary__resting.rgba
                : colors.text.static_icons__tertiary.rgba
            }
            data={
              item.value === sortValue
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
