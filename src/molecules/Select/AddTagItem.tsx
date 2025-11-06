import { FC, KeyboardEvent, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { add_box } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style/colors';
import {
  MenuItemWrapper,
  PersistentListItem,
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
  mode?: 'persistent' | 'menu';
  children: string;
}

export const AddTagItem: FC<AddTagItemProps> = ({
  itemRefs,
  onItemKeyDown,
  index,
  onAddItem,
  addItemSingularWord,
  mode,
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

  const addItemContent = useMemo(() => {
    return (
      <>
        <Icon data={add_box} color={colors.interactive.primary__resting.rgba} />
        <span>
          <Typography group="navigation" variant="menu_title">
            Add &quot;{children}&quot; as new {addItemSingularWord}
          </Typography>
        </span>
      </>
    );
  }, [addItemSingularWord, children]);

  if (mode === 'persistent') {
    return (
      <MenuItemWrapper>
        <PersistentListItem
          ref={(element: HTMLButtonElement | null) => {
            itemRefs.current[index] = element;
          }}
          onClick={onAddItem}
          onKeyDownCapture={handleOnKeyDown}
        >
          {addItemContent}
        </PersistentListItem>
      </MenuItemWrapper>
    );
  }

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
        {addItemContent}
      </StyledMenuItem>
    </MenuItemWrapper>
  );
};
