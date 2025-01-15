import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Button, Checkbox, Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_right } from '@equinor/eds-icons';

import {
  StyledOption,
  StyledOptionItem,
  StyledOptionWrapper,
} from 'src/molecules/OptionDrawer/OptionDrawer.styles';

const getAllItems = <T extends { id: string; label: string; children?: T[] }>(
  items: T[]
): T[] => {
  if (items.length === 0) {
    return [];
  }

  let options: T[] = [];

  items.forEach((item) => {
    const children = getAllItems(item?.children ?? []);
    options = [item, ...options, ...children];
  });

  return options;
};

type StatusType = 'CHECKED' | 'INTERMEDIATE' | 'NONE';

const getStatus = <T extends { id: string; label: string; children?: T[] }>(
  item: T,
  selectedItems: T[],
  singleSelect?: boolean,
  showIntermediateParent?: boolean
): StatusType => {
  const itemIsSelected =
    selectedItems.find((s) => s.id === item.id) !== undefined;

  if (itemIsSelected) return 'CHECKED';

  if (
    item.children === undefined ||
    item.children.length === 0 ||
    (singleSelect && !showIntermediateParent)
  )
    return 'NONE';

  const selected = getAllItems(item?.children).map(
    (i) => selectedItems.find((s) => s.id === i.id) !== undefined
  );

  if (!singleSelect && selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((s) => !s)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};

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
  siblings?: number;
  animateCheck?: boolean;
  animateUncheck?: boolean;
  animateParent?: Dispatch<SetStateAction<boolean>>;
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
  siblings,
  animateCheck,
  animateUncheck,
  animateParent,
  openAll,
  showIntermediateParent = false,
  parentHasNestedItems = false,
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(item, selectedItems, singleSelect, showIntermediateParent)
  );
  const [animationActive, setAnimationActive] = useState(false);

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

  const handleClick = (e: MouseEvent) => {
    if (item.disabled) return;

    if (item.children && item.children.length !== 0) {
      setOpen((o) => !o);
    }
    handleCheck(e);
  };

  const handleToggle = (e: MouseEvent | ChangeEvent) => {
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
    setAnimationActive(false);
  };

  const animate = (
    e: MouseEvent | ChangeEvent,
    shouldAnimateParent: boolean
  ) => {
    // Only animate whole group when everything is checked/unchecked
    if (shouldAnimateParent && animateParent) {
      animateParent(true);
      setStatus(status === 'CHECKED' ? 'NONE' : 'CHECKED');
      setTimeout(() => {
        handleToggle(e);
      }, 400);
    } else if (!siblings) {
      setAnimationActive(true);
      setStatus(status === 'CHECKED' ? 'NONE' : 'CHECKED');
      setTimeout(() => {
        handleToggle(e);
      }, 400);
    } else {
      handleToggle(e);
    }
  };

  const shouldAnimateParent = (checked: boolean) => {
    if (siblings && animateParent) {
      const siblingsSelected = selectedItems.filter((selected) =>
        selected.id.includes(item.parentId ?? '')
      ).length;

      if (!checked && animateCheck && siblingsSelected === siblings - 1) {
        return true;
      } else if (checked && animateUncheck && siblingsSelected === 1) {
        return true;
      }
    }
    return false;
  };

  const handleCheck = (e: MouseEvent | ChangeEvent) => {
    if (status === 'CHECKED' && animateUncheck) {
      animate(e, shouldAnimateParent(true));
    } else if (
      (status === 'NONE' || status === 'INTERMEDIATE') &&
      animateCheck
    ) {
      animate(e, shouldAnimateParent(false));
    } else {
      handleToggle(e);
    }
  };

  const handleChevronIconClick = () => {
    setOpen((state) => !state);
  };

  const hasChildren = item.children && item.children.length !== 0;

  return (
    <StyledOptionWrapper
      key={
        animationActive
          ? `animated-StyledOptionWrapper-${item.id}`
          : `StyledOptionWrapper-${item.id}`
      }
      $section={section}
      $animationActive={animationActive}
      data-testid={animationActive ? 'animated-' + item.id : item.id}
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
          onClick={handleClick}
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
            siblings={item.children?.length}
            animateCheck={animateCheck}
            animateUncheck={animateUncheck}
            animateParent={setAnimationActive}
            openAll={openAll}
            showIntermediateParent={showIntermediateParent}
            parentHasNestedItems
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';
