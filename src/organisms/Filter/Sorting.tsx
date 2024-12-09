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

const Wrapper = styled.div`
  position: relative;
  > span:first-child {
    visibility: hidden;
  }
  > span:last-child {
    position: absolute;
    white-space: nowrap;
    left: 0;
  }
`;

export function Sorting<S>({
  sortValue,
  onSortChange,
  sortItems,
}: SortingProps<S>) {
  const activeSorting = sortItems.find((item) => item.value === sortValue);
  const longestLabel = sortItems
    .sort((a, b) => b.label.length - a.label.length)
    .at(0)?.label;

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
      <Wrapper>
        <Typography as="span" variant="button" group="navigation">
          Sort by {longestLabel?.toLowerCase()}
        </Typography>
        <Typography as="span" variant="button" group="navigation">
          Sort by {activeSorting?.label.toLowerCase()}
        </Typography>
      </Wrapper>
      <Icon data={sort} />
    </ButtonWithMenu>
  );
}
