import { FC, KeyboardEvent } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { add_box } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style/colors';
import {
  MenuItemWrapper,
  StyledMenuItem,
} from 'src/molecules/Select/Select.styles';
import {
  MultiSelectMenuItemProps,
  SelectOptionRequired,
} from 'src/molecules/Select/Select.types';

interface AddTagItemProps {
  itemRefs: MultiSelectMenuItemProps<SelectOptionRequired>['itemRefs'];
  onItemKeyDown: MultiSelectMenuItemProps<SelectOptionRequired>['onItemKeyDown'];
  onAddItem: () => void;
  addItemSingularWord: string;
  index: number;
  children: string;
}

export const AddTagItem: FC<AddTagItemProps> = ({
  itemRefs,
  onItemKeyDown,
  index,
  onAddItem,
  addItemSingularWord,
  children,
}) => {
  const handleOnKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      onAddItem();
    } else {
      onItemKeyDown(event);
    }
  };

  return (
    <MenuItemWrapper>
      <StyledMenuItem
        index={index}
        ref={(element: HTMLButtonElement | null) => {
          itemRefs.current[index] = element;
        }}
        onClick={onAddItem}
        onKeyDownCapture={handleOnKeyDown}
      >
        <Icon data={add_box} color={colors.interactive.primary__resting.rgba} />
        <span>
          Add &quot;{children}&quot; as new {addItemSingularWord}
        </span>
      </StyledMenuItem>
    </MenuItemWrapper>
  );
};
