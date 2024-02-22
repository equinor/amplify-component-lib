import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Checkbox, Icon } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled, { css, keyframes } from 'styled-components';

const { colors } = tokens;

interface StyledOptionProps {
  $section: number;
  $animationActive?: boolean;
}

const animateToggle = keyframes`
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
  }
`;

const StyledOptionWrapper = styled.div<StyledOptionProps>`
  margin-left: ${({ $section }) => ($section > 0 ? '22px' : '')};
  border-left: ${({ $section }) =>
    $section > 0 ? '1px solid ' + colors.ui.background__medium.rgba : ''};
  opacity: 1;
  color: ${colors.text.static_icons__default.rgba};
  animation: ${({ $animationActive }) =>
    $animationActive
      ? css`
          ${animateToggle} 400ms ease-in
        `
      : 'none'};
`;

const StyledOption = styled.div<StyledOptionProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
  }

  svg {
    fill: ${colors.interactive.primary__resting.rgba};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

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
  singleSelect?: boolean
): StatusType => {
  if (
    item.children === undefined ||
    item.children.length === 0 ||
    singleSelect
  ) {
    return selectedItems.find((s) => s.id === item.id) !== undefined
      ? 'CHECKED'
      : 'NONE';
  }

  const selected = getAllItems(item?.children).map(
    (i) => selectedItems.find((s) => s.id === i.id) !== undefined
  );

  if (selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((s) => !s)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};

export type ToggleEventProps<T> = {
  items: T[];
  toggle: boolean;
  event: MouseEvent | ChangeEvent;
};

export type OptionDrawerProps<
  T extends { id: string; label: string; parentId?: string; children?: T[] },
> = {
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
};

/**
 * @deprecated Use ComboBox instead
 */
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
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(item, selectedItems, singleSelect)
  );
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    setStatus(getStatus(item, selectedItems, singleSelect));
  }, [item, selectedItems, singleSelect]);

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
      !singleSelect &&
      item.children !== undefined
        ? [...item.children]
        : [item];
    if (status === 'CHECKED') {
      onToggle({ items: items, toggle: false, event: e });
    } else if (status === 'NONE' || status === 'INTERMEDIATE') {
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
          indeterminate={status === 'INTERMEDIATE'}
          checked={status === 'CHECKED'}
          onChange={(e) => handleCheck(e)}
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
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
