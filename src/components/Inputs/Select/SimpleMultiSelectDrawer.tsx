import { CSSProperties, useRef, useState } from 'react';
import React, { Button, Icon, Input, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import OptionDrawer from './OptionDrawer';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

const { colors, spacings, elevation } = tokens;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: ${spacings.comfortable.small};
  height: ${spacings.comfortable.large};
  width: ${spacings.comfortable.large};
  top: 6px;
`;

const StyledList = styled.div`
  background: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  overflow-y: scroll;
  max-height: 300px;
  padding: 0;
  margin-top: 4px;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 50;
`;

export type SimpleMultiSelectDrawerProps<
  T extends { id: string; label: string; children?: T[] }
> = {
  disabled?: boolean;
  id?: string;
  items: T[];
  selectedItems: T[];
  label: string;
  meta?: string;
  onChange: (values: T[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  style?: CSSProperties;
};

const SimpleMultiSelectDrawer = <
  T extends { id: string; label: string; children?: T[] }
>({
  disabled = false,
  id,
  items = [],
  selectedItems = [],
  label,
  meta,
  onChange,
  placeholder,
  readOnly = false,
  style,
}: SimpleMultiSelectDrawerProps<T>) => {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef.current as HTMLElement, (e) => {
    if (
      !menuRef.current?.contains(e.target as Node) &&
      !inputWrapperRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  });

  const handleToggle = (item: T, toggle: boolean) => {
    if (toggle) {
      onChange([...selectedItems, item]);
    } else {
      onChange(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  return (
    <StyledWrapper style={style}>
      <Label label={label} meta={meta} disabled={disabled} />
      <StyledInputWrapper ref={inputWrapperRef}>
        <Input
          id={id}
          disabled={disabled}
          value={search}
          readOnly={readOnly}
          onFocus={() => setOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
        />
        <StyledButton
          variant="ghost_icon"
          aria-label="toggle options"
          title="open"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon data={open ? arrow_drop_up : arrow_drop_down} />
        </StyledButton>
      </StyledInputWrapper>
      <StyledList ref={menuRef}>
        {open &&
          items.map((item) => (
            <OptionDrawer<T>
              key={item.id}
              onToggle={handleToggle}
              selectedItems={selectedItems}
              item={item}
              singleSelect
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

SimpleMultiSelectDrawer.displayName = 'SimpleMultiSelectDrawer';

export default SimpleMultiSelectDrawer;
