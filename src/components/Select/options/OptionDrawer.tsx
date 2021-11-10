import { MouseEvent, useState } from 'react';
import { Icon } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { Item } from '..';

interface StyledOptionProps {
  section: number;
}

const StyledOptionWrapper = styled.div<StyledOptionProps>`
  margin-left: ${(props) => (props.section > 0 ? '22px' : '')};
  border-left: ${(props) => (props.section > 0 ? '1px solid #DCDCDC' : '')};
`;

const StyledOption = styled.div<StyledOptionProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #f7f7f7;
  }
`;

interface OptionDrawerProps extends Item {
  section?: number;
  onToggle: (value: string, toggle: boolean) => void;
  values: string[];
}

const OptionDrawer = ({
  value,
  onToggle,
  children,
  label,
  section = 0,
  values,
}: OptionDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(!!values.find((val) => val === value));

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
      if (children.length !== 0) {
        setOpen((o) => !o);
      } else if (e.target instanceof HTMLDivElement) {
        handleCheck();
      }
    }
  };

  const handleCheck = () => {
    onToggle(value, !checked);
    setChecked((c) => !c);
  };

  return (
    <>
      <StyledOptionWrapper key={value} section={section}>
        <StyledOption section={section} onClick={handleClick}>
          <Checkbox checked={checked} onChange={handleCheck} />
          {label}
          {children && children.length !== 0 && (
            <Icon data={open ? arrow_drop_up : arrow_drop_down} />
          )}
        </StyledOption>
        {open &&
          children.map((item) => (
            <OptionDrawer
              key={item.value}
              section={section + 1}
              onToggle={onToggle}
              values={values}
              {...item}
            />
          ))}
      </StyledOptionWrapper>
    </>
  );
};

export default OptionDrawer;
