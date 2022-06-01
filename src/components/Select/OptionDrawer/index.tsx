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
    const children = getAllItems(item.items);
    options = [item, ...options, ...children];
  });

  return options;
};

type StatusType = 'CHECKED' | 'INTERMEDIATE' | 'NONE';

const getStatus = <T,>(
  items: SelectItem<T>[],
  id: string,
  selectedItems: string[],
  singleSelect?: boolean
): StatusType => {
  if (items.length === 0 || singleSelect) {
    return selectedItems.find((si) => si === id) !== undefined
      ? 'CHECKED'
      : 'NONE';
  }

  const selected = getAllItems(items).map(
    (item) => selectedItems.find((si) => si === item.id) !== undefined
  );

  if (selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((val) => val === false)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};

export type OptionDrawerProps<T> = {
  section?: number;
  onToggle: (id: string, toggle: boolean) => void;
  selectedItems: string[];
  singleSelect?: boolean;
} & SelectItem<T>;

const OptionDrawer = <T,>({
  id,
  onToggle,
  items = [],
  label,
  section = 0,
  selectedItems = [],
  singleSelect,
}: OptionDrawerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>(
    getStatus(items, id, selectedItems, singleSelect)
  );

  useEffect(() => {
    setStatus(getStatus(items, id, selectedItems, singleSelect));
  }, [items, id, selectedItems, singleSelect]);

  useEffect(() => {
    if (items.length > 0 && !singleSelect) {
      const selected = getAllItems(items).map(
        (item) => selectedItems.find((si) => si === item.id) !== undefined
      );

      if (selected.every(Boolean) && !selectedItems.includes(id)) {
        onToggle(id, true);
      } else if (!selected.every(Boolean) && selectedItems.includes(id)) {
        onToggle(id, false);
      }
    }
  }, [selectedItems, id, onToggle, items, singleSelect]);

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
      if (items && items.length !== 0) {
        setOpen((o) => !o);
      } else if (e.target instanceof HTMLDivElement) {
        handleCheck();
      }
    }
  };

  const handleCheck = () => {
    if (status === 'CHECKED') {
      onToggle(id, false);
      if (!singleSelect) {
        getAllItems(items).forEach(
          (item) => selectedItems.includes(item.id) && onToggle(item.id, false)
        );
      }
    } else if (status === 'NONE' || status === 'INTERMEDIATE') {
      onToggle(id, true);
      if (!singleSelect) {
        getAllItems(items).forEach(
          (item) => !selectedItems.includes(item.id) && onToggle(item.id, true)
        );
      }
    }
  };

  return (
    <StyledOptionWrapper key={`StyledOptionWrapper-${id}`} section={section}>
      <StyledOption section={section} onClick={handleClick}>
        <Checkbox
          indeterminate={status === 'INTERMEDIATE'}
          checked={status === 'CHECKED'}
          onChange={handleCheck}
          color="secondary"
        />
        {label}
        {items && items.length !== 0 && (
          <StyledIcon data={open ? arrow_drop_up : arrow_drop_down} />
        )}
      </StyledOption>
      {open &&
        items?.map((item) => (
          <OptionDrawer
            key={`OptionDrawer-${item.id}`}
            section={section + 1}
            onToggle={onToggle}
            selectedItems={selectedItems}
            {...item}
          />
        ))}
    </StyledOptionWrapper>
  );
};
OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
