import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Checkbox } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import {
  StyledIcon,
  StyledOption,
  StyledOptionWrapper,
} from './OptionDrawer.styles';
import { StatusType } from './OptionDrawer.types';
import { getStatus } from './OptionDrawer.utils';

export interface ToggleEventProps<T> {
  items: T[];
  toggle: boolean;
  event: MouseEvent | ChangeEvent;
}

export interface OptionDrawerProps<
  T extends { id: string; label: string; parentId?: string; children?: T[] },
> {
  /**
   * @requires id, label and value
   */
  item: T;
  onToggle: ({ items, toggle, event }: ToggleEventProps<T>) => void;
  section?: number;
  selectedItems?: T[];
  singleSelect?: boolean;
  siblings?: number;
  /**
   * This is useful in cases where we want to add elements to the options list when checked
   */
  animateCheck?: boolean;
  /**
   * This is useful in cases where we want to filter away elements from the options list when unchecked
   */
  animateUncheck?: boolean;
  animateParent?: Dispatch<SetStateAction<boolean>>;
  openAll?: boolean;
  /**
   * when parent is in an indeterminate state, this flag will help determine if parent and children should all be unchecked or checked
   */
  shouldToggleOffOnIndeterminateState?: boolean;
  /**
   * When checking parent, children should be unchecked
   */
  excludeChildrenOnParentSelection?: boolean;
}

const OptionDrawer = <
  T extends { id: string; label: string; parentId?: string; children?: T[] },
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
  shouldToggleOffOnIndeterminateState = false,
  excludeChildrenOnParentSelection = false,
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(
      item,
      selectedItems,
      singleSelect && !shouldToggleOffOnIndeterminateState,
      excludeChildrenOnParentSelection
    )
  );
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    setStatus(
      getStatus(
        item,
        selectedItems,
        singleSelect && !shouldToggleOffOnIndeterminateState,
        excludeChildrenOnParentSelection
      )
    );
  }, [
    excludeChildrenOnParentSelection,
    item,
    selectedItems,
    shouldToggleOffOnIndeterminateState,
    singleSelect,
  ]);

  useEffect(() => {
    if (openAll) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openAll]);

  const handleClick = (e: MouseEvent) => {
    const checkboxElement = e.target as SVGPathElement;
    const checkboxSVGElement = e.target as SVGElement;

    // if element is of type checkbox, do not take any action.
    if (
      !(checkboxElement.getAttribute('name') === 'checked') &&
      !(checkboxElement.getAttribute('name') === 'not-checked') &&
      !(
        checkboxSVGElement.children.length > 0 &&
        checkboxSVGElement.children[0].getAttribute('name') === 'checked'
      ) &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLSpanElement)
    ) {
      if (item.children && item.children.length !== 0) {
        setOpen((o) => !o);
      } else if (e.target instanceof HTMLDivElement) {
        handleCheck(e);
      }
    }
  };

  const handleToggle = (e: MouseEvent | ChangeEvent) => {
    const items =
      item.children?.length !== 0 &&
      (!singleSelect ||
        (singleSelect && shouldToggleOffOnIndeterminateState)) &&
      item.children !== undefined
        ? [...item.children]
        : [item];
    console.log({ items, item, e, status, selectedItems });
    if (
      status === StatusType.NONE &&
      excludeChildrenOnParentSelection &&
      item.children !== undefined
    ) {
      const selectedIds = selectedItems.map((i) => i.id);
      const childrenToBeRemoved = item.children?.filter((c) =>
        selectedIds.includes(c.id)
      );
      // check if item has children and if any of those children are selected
      console.log('removing immediate children', {
        items,
        e,
        selectedItems,
        item,
      });
      onToggle({
        items: [item],
        toggle: true,
        event: e,
      });
    } else if (
      status === StatusType.CHECKED ||
      (shouldToggleOffOnIndeterminateState &&
        status === StatusType.INTERMEDIATE)
    ) {
      console.log('toggle off', { items, e, item, selectedItems });
      onToggle({
        items: excludeChildrenOnParentSelection ? [item] : items,
        toggle: false,
        event: e,
      });
    } else if (
      status === StatusType.NONE ||
      (!shouldToggleOffOnIndeterminateState &&
        status === StatusType.INTERMEDIATE)
    ) {
      console.log('toggle on', { items, e, item, selectedItems });
      onToggle({ items: items, toggle: true, event: e });
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
      setStatus(
        status === StatusType.CHECKED ? StatusType.NONE : StatusType.CHECKED
      );
      setTimeout(() => {
        handleToggle(e);
      }, 400);
    } else if (!siblings) {
      setAnimationActive(true);
      setStatus(
        status === StatusType.CHECKED ? StatusType.NONE : StatusType.CHECKED
      );
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
    if (status === StatusType.CHECKED && animateUncheck) {
      animate(e, shouldAnimateParent(true));
    } else if (
      (status === StatusType.NONE || status === StatusType.INTERMEDIATE) &&
      animateCheck
    ) {
      animate(e, shouldAnimateParent(false));
    } else {
      handleToggle(e);
    }
  };

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
      <StyledOption $section={section} onClick={handleClick}>
        <Checkbox
          indeterminate={status === StatusType.INTERMEDIATE}
          checked={status === StatusType.CHECKED}
          onChange={handleCheck}
          color="secondary"
        />
        {item.label}
        {item.children && item.children.length !== 0 && (
          <StyledIcon data={open ? arrow_drop_up : arrow_drop_down} />
        )}
      </StyledOption>
      {open &&
        item.children?.map((i) => (
          <OptionDrawer<T>
            key={`OptionDrawer-${i.id}`}
            section={section + 1}
            onToggle={onToggle}
            selectedItems={selectedItems}
            item={i}
            singleSelect={singleSelect}
            siblings={item.children?.length}
            animateCheck={animateCheck}
            animateUncheck={animateUncheck}
            animateParent={setAnimationActive}
            openAll={openAll}
            excludeChildrenOnParentSelection={excludeChildrenOnParentSelection}
            shouldToggleOffOnIndeterminateState={
              shouldToggleOffOnIndeterminateState
            }
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
