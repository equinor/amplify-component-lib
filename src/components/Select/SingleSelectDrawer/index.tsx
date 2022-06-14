import { Button, Icon, Input, Label } from '@equinor/eds-core-react';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import OptionDrawer from '../OptionDrawer';
import { SelectItem } from '..';
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

export type SingleSelectDrawerProps<T> = {
  disabled?: boolean;
  id?: string;
  items: SelectItem<T>[];
  initialItem: string | undefined;
  label: string;
  meta?: string;
  onChange?: (value: SelectItem<T> | undefined) => void;
  placeholder?: string;
  readOnly?: boolean;
  style?: CSSProperties;
};

const SingleSelectDrawer = <T,>({
  disabled = false,
  onChange,
  items = [],
  label,
  initialItem,
  meta,
  readOnly = false,
  placeholder,
}: SingleSelectDrawerProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem<T> | undefined>(
    items.find((item) => item.id === initialItem)
  );
  const [inputItems, setInputItems] = useState<SelectItem<T>[]>(items);
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

  useEffect(() => {
    if (search !== '') {
      setInputItems(
        items.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setInputItems(items);
    }
  }, [search, items]);

  const handleToggle = (item: SelectItem<T>, toggle: boolean) => {
    if (toggle) {
      setSelectedItem(item);
      onChange && onChange(item);
    } else {
      setSelectedItem(undefined);
      onChange && onChange(undefined);
    }
  };

  return (
    <StyledWrapper>
      <Label label={label} meta={meta} disabled={disabled} />
      <StyledInputWrapper ref={inputWrapperRef}>
        <Input
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
          inputItems.map((item) => (
            <OptionDrawer<T>
              key={item.id}
              onToggle={handleToggle}
              selectedItems={selectedItem ? [selectedItem] : []}
              singleSelect
              item={item}
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

SingleSelectDrawer.displayName = 'SingleSelectDrawer';

export default SingleSelectDrawer;
