import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { Button, Checkbox, Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_right } from '@equinor/eds-icons';

import {
  StyledOption,
  StyledOptionItem,
  StyledOptionWrapper,
} from 'src/molecules/OptionDrawer/OptionDrawer.styles';
import {
  getStatus,
  StatusType,
} from 'src/molecules/OptionDrawer/OptionDrawer.utils';

export interface ToggleEventProps<T> {
  items: T[];
  toggle: boolean;
  event: MouseEvent | ChangeEvent;
}

export interface OptionDrawerProps<
  T extends {
    id: string;
    label: string;
    disabled?: boolean;
    parentId?: string;
    children?: T[];
  },
> {
  item: T;
  onToggle: ({ items, toggle, event }: ToggleEventProps<T>) => void;
  section?: number;
  selectedItems?: T[];
  singleSelect?: boolean;
  openAll?: boolean;
  showIntermediateParent?: boolean;
  parentHasNestedItems?: boolean;
}

export const OptionDrawer = <
  T extends {
    id: string;
    label: string;
    disabled?: boolean;
    parentId?: string;
    children?: T[];
  },
>({
  item,
  onToggle,
  section = 0,
  selectedItems = [],
  singleSelect = false,
  openAll,
  showIntermediateParent = false,
  parentHasNestedItems = false,
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(item, selectedItems, singleSelect, showIntermediateParent)
  );

  useEffect(() => {
    setStatus(
      getStatus(item, selectedItems, singleSelect, showIntermediateParent)
    );
  }, [item, selectedItems, singleSelect, showIntermediateParent]);

  useEffect(() => {
    if (openAll) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openAll]);

  const handleOnClick = (e: MouseEvent | ChangeEvent) => {
    if (item.children && item.children.length !== 0) {
      setOpen((o) => !o);
    }

    const items =
      item.children?.length !== 0 &&
      !singleSelect &&
      item.children !== undefined
        ? [...item.children]
        : [item];

    if (status === 'CHECKED') {
      onToggle({ items: items, toggle: false, event: e });
      setOpen(false);
    } else if (status === 'NONE' || status === 'INTERMEDIATE') {
      onToggle({ items: items, toggle: true, event: e });
      setOpen(true);
    }
  };

  const handleChevronIconClick = () => {
    setOpen((state) => !state);
  };

  const hasChildren = item.children && item.children.length !== 0;

  return (
    <StyledOptionWrapper
      key={`StyledOptionWrapper-${item.id}`}
      $section={section}
      data-testid={item.id}
    >
      <StyledOptionItem $paddedLeft={parentHasNestedItems && !hasChildren}>
        {hasChildren && (
          <Button
            variant="ghost_icon"
            onClick={handleChevronIconClick}
            data-testid="chevron-toggler-option-drawer"
          >
            <Icon data={open ? chevron_down : chevron_right} />
          </Button>
        )}
        <StyledOption
          $section={section}
          onClick={handleOnClick}
          disabled={!!item.disabled}
        >
          <Checkbox
            indeterminate={status === 'INTERMEDIATE'}
            checked={status === 'CHECKED'}
            color="secondary"
            disabled={!!item.disabled}
            onChange={() => null}
          />
          {item.label}
        </StyledOption>
      </StyledOptionItem>
      {open &&
        item.children?.map((child) => (
          <OptionDrawer<T>
            key={`OptionDrawer-${child.id}`}
            section={section + 1}
            onToggle={onToggle}
            selectedItems={selectedItems}
            item={child}
            singleSelect={singleSelect}
            openAll={openAll}
            showIntermediateParent={showIntermediateParent}
            parentHasNestedItems
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';
