import { forwardRef, MouseEvent, useEffect, useState } from 'react';
import { Icon } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { SelectItem } from '..';

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

interface OptionDrawerProps extends SelectItem {
  section?: number;
  onToggle: (value: SelectItem, toggle: boolean) => void;
  values: SelectItem[];
}

const OptionDrawer = forwardRef<HTMLDivElement, OptionDrawerProps>(
  (
    {
      value,
      onToggle,
      children,
      label,
      section = 0,
      values,
    }: OptionDrawerProps,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(
      !!values.find((val) => val.value === value)
    );

    useEffect(() => {
      setChecked(!!values.find((val) => val.value === value));
    }, [values, value]);

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
        if (children && children.length !== 0) {
          setOpen((o) => !o);
        } else if (e.target instanceof HTMLDivElement) {
          handleCheck();
        }
      }
    };

    const handleCheck = () => {
      onToggle({ value, label }, !checked);
      setChecked((c) => !c);
    };

    return (
      <StyledOptionWrapper ref={ref} key={value} section={section}>
        <StyledOption section={section} onClick={handleClick}>
          <Checkbox
            checked={checked}
            onChange={handleCheck}
            color="secondary"
          />
          {label}
          {children && children.length !== 0 && (
            <StyledIcon data={open ? arrow_drop_up : arrow_drop_down} />
          )}
        </StyledOption>
        {open &&
          children?.map((item) => (
            <OptionDrawer
              key={item.value}
              section={section + 1}
              onToggle={onToggle}
              values={values}
              {...item}
            />
          ))}
      </StyledOptionWrapper>
    );
  }
);

OptionDrawer.displayName = 'OptionDrawer';

export default OptionDrawer;
