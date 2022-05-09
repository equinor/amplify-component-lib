import { Checkbox, Icon } from '@equinor/eds-core-react';
import { MouseEvent, forwardRef, useEffect, useState } from 'react';
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

const getAllItems = (items: SelectItem[]): SelectItem[] => {
  if (items.length === 0) {
    return [];
  }

  let options: SelectItem[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.items);
    options = [item, ...options, ...children];
  });

  return options;
};

type StatusType = 'CHECKED' | 'INTERMEDIATE' | 'NONE';

const getStatus = (
  items: SelectItem[],
  value: string,
  selectedItems: string[]
): StatusType => {
  if (items.length === 0) {
    return selectedItems.includes(value) ? 'CHECKED' : 'NONE';
  }

  const selected = getAllItems(items).map((item) =>
    selectedItems.includes(item.value)
  );

  if (selected.every(Boolean)) {
    return 'CHECKED';
  } else if (selected.every((val) => val === false)) {
    return 'NONE';
  }

  return 'INTERMEDIATE';
};

export interface OptionDrawerProps extends SelectItem {
  section?: number;
  onToggle: (value: string, toggle: boolean) => void;
  selectedItems: string[];
}

const OptionDrawer = forwardRef<HTMLDivElement, OptionDrawerProps>(
  (
    {
      value,
      onToggle,
      items = [],
      label,
      section = 0,
      selectedItems = [],
    }: OptionDrawerProps,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<StatusType>(
      getStatus(items, value, selectedItems)
    );

    useEffect(() => {
      setStatus(getStatus(items, value, selectedItems));
    }, [items, value, selectedItems]);

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
        onToggle(value, false);
        getAllItems(items).forEach((item) => onToggle(item.value, false));
      } else if (status === 'NONE' || status === 'INTERMEDIATE') {
        onToggle(value, true);
        getAllItems(items).forEach((item) => onToggle(item.value, true));
      }
    };

    return (
      <StyledOptionWrapper ref={ref} key={value} section={section}>
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
              key={item.value}
              section={section + 1}
              onToggle={onToggle}
              selectedItems={selectedItems}
              {...item}
            />
          ))}
      </StyledOptionWrapper>
    );
  }
);

OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
