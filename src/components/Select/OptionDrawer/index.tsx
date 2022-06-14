import { Checkbox, Icon } from '@equinor/eds-core-react';
import { MouseEvent, useEffect, useState } from 'react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import { SelectItem } from '..';
import styled from 'styled-components';

interface StyledOptionProps {
  section: number;
}

const StyledOptionWrapper = styled.div<StyledOptionProps>`
  margin-left: ${(props) => (props.section > 0 ? '22px' : '')};
  border-left: ${(props) => (props.section > 0 ? '1px solid #DCDCDC' : '')};
`;

const StyledOption = styled.div<StyledOptionProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #f7f7f7;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const getAllItems = <T,>(items: SelectItem<T>[]): SelectItem<T>[] => {
  if (items.length === 0) {
    return [];
  }

  let options: SelectItem<T>[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.children);
    options = [item, ...options, ...children];
  });

  return options;
};

type StatusType = 'CHECKED' | 'INTERMEDIATE' | 'NONE';

const getStatus = <T,>(
  item: SelectItem<T>,
  selectedItems: SelectItem<T>[],
  singleSelect?: boolean
): StatusType => {
  if (item.children.length === 0 || singleSelect) {
    return selectedItems.find((s) => s.id === item.id) !== undefined
      ? 'CHECKED'
      : 'NONE';
  }

  const selected = getAllItems(item.children).map(
    (i) => selectedItems.find((s) => s.id === i.id) !== undefined
  );

  if (selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((s) => s === false)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};

export type OptionDrawerProps<T> = {
  item: SelectItem<T>;
  onToggle: (item: SelectItem<T>, toggle: boolean) => void;
  section?: number;
  selectedItems?: SelectItem<T>[];
  singleSelect?: boolean;
};

const OptionDrawer = <T,>({
  item,
  onToggle,
  section = 0,
  selectedItems = [],
  singleSelect,
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(item, selectedItems, singleSelect)
  );

  useEffect(() => {
    setStatus(getStatus(item, selectedItems, singleSelect));
  }, [item, selectedItems, singleSelect]);

  useEffect(() => {
    if (item.children.length > 0 && !singleSelect) {
      const selected = getAllItems(item.children).map(
        (item) => selectedItems.find((s) => s.id === item.id) !== undefined
      );

      if (
        selected.every(Boolean) &&
        selectedItems.find((s) => s.id === item.id) === undefined
      ) {
        onToggle(item, true);
      } else if (
        !selected.every(Boolean) &&
        selectedItems.find((s) => s.id === item.id) !== undefined
      ) {
        onToggle(item, false);
      }
    }
  }, [selectedItems, item, onToggle, singleSelect]);

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
        handleCheck();
      }
    }
  };

  const handleCheck = () => {
    if (status === 'CHECKED') {
      onToggle(item, false);
      if (!singleSelect) {
        getAllItems(item.children).forEach(
          (i) =>
            selectedItems.find((s) => s.id === i.id) !== undefined &&
            onToggle(i, false)
        );
      }
    } else if (status === 'NONE' || status === 'INTERMEDIATE') {
      onToggle(item, true);
      if (!singleSelect) {
        getAllItems(item.children).forEach(
          (i) =>
            selectedItems.find((s) => s.id === i.id) === undefined &&
            onToggle(i, true)
        );
      }
    }
  };

  return (
    <StyledOptionWrapper
      key={`StyledOptionWrapper-${item.id}`}
      section={section}
    >
      <StyledOption section={section} onClick={handleClick}>
        <Checkbox
          indeterminate={status === 'INTERMEDIATE'}
          checked={status === 'CHECKED'}
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
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
