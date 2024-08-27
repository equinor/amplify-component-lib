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
  onMouseEnterItem: MultiSelectMenuItemProps<SelectOptionRequired>['onMouseEnterItem'];
  onItemKeyDown: MultiSelectMenuItemProps<SelectOptionRequired>['onItemKeyDown'];
  onAddItem: () => void;
  index: number;
  children: string;
}

export const AddTagItem: FC<AddTagItemProps> = ({
  itemRefs,
  onMouseEnterItem,
  onItemKeyDown,
  index,
  onAddItem,
  children,
}) => {
  const handleOnKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      onAddItem();
    } else {
      onItemKeyDown(event);
    }
  };

  const handleOnMouseEnter = () => {
    onMouseEnterItem(index);
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
        onMouseEnter={handleOnMouseEnter}
      >
        <Icon data={add_box} color={colors.interactive.primary__resting.rgba} />
        <span>Add &quot;{children}&quot; as new tag</span>
      </StyledMenuItem>
    </MenuItemWrapper>
  );
};
