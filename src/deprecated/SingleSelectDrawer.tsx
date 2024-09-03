import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';

import { Button, Icon, Input, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { spacings } from 'src/atoms/style';
import { OptionDrawer } from 'src/molecules/OptionDrawer/OptionDrawer';

import styled from 'styled-components';

const { colors, elevation } = tokens;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  input {
    color: ${colors.text.static_icons__default.rgba};
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: ${spacings.small};
  height: ${spacings.large};
  width: ${spacings.large};
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

export interface SingleSelectDrawerProps<
  T extends { id: string; label: string },
> {
  disabled?: boolean;
  id?: string;
  items: T[];
  initialItem: T | undefined;
  label: string;
  meta?: string;
  onChange?: (value: T | undefined) => void;
  placeholder?: string;
  readOnly?: boolean;
  style?: CSSProperties;
}

/**
 * @deprecated Use ComboBox instead
 */
const SingleSelectDrawer = <T extends { id: string; label: string }>({
  disabled = false,
  onChange,
  items = [],
  label,
  initialItem,
  meta,
  readOnly = false,
  placeholder,
}: SingleSelectDrawerProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | undefined>(
    items.find((item) => item?.id === initialItem?.id)
  );
  const [inputItems, setInputItems] = useState<T[]>(items);
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

  const handleToggle = (items: T[], toggle: boolean) => {
    if (toggle) {
      items.forEach((item) => {
        setSelectedItem(item);
        onChange?.(item);
      });
    } else {
      items.forEach(() => {
        setSelectedItem(undefined);
        onChange?.(undefined);
      });
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder={placeholder}
          disabled={disabled}
        />
        <StyledButton
          variant="ghost_icon"
          aria-label="toggle options"
          title="open"
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
        >
          <Icon data={open ? arrow_drop_up : arrow_drop_down} />
        </StyledButton>
      </StyledInputWrapper>
      <StyledList ref={menuRef}>
        {open &&
          inputItems.map((item) => (
            <OptionDrawer<T>
              key={item.id}
              onToggle={(e) => handleToggle(e.items, e.toggle)}
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
