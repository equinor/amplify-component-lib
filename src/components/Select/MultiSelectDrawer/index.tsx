import {
  Button,
  Icon,
  Input,
  Label,
  MultiSelectProps,
} from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';

import OptionDrawer from '../OptionDrawer';
import { SelectItem } from '..';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

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

export type MultiSelectDrawerProps<T> = {
  items: SelectItem<T>[];
  onChange: (items: string[]) => void;
  initialSelectedItems: string[];
} & Omit<MultiSelectProps, 'items' | 'initialSelectedItems' | 'onChange'>;

const MultiSelectDrawer = <T,>({
  className,
  disabled = false,
  initialSelectedItems = [],
  items = [],
  label,
  onChange,
  meta,
  readOnly = false,
  placeholder,
}: MultiSelectDrawerProps<T>) => {
  const [inputItems, setInputItems] = useState<SelectItem<T>[]>(items);
  const [selectedItems, setSelectedItems] =
    useState<string[]>(initialSelectedItems);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  useEffect(() => {
    onChange(selectedItems);
  }, [onChange, selectedItems]);

  const handleToggle = (id: string, toggle: boolean) => {
    if (toggle) {
      setSelectedItems((items) => [...items, id]);
    } else {
      setSelectedItems((items) => items.filter((i) => i !== id));
    }
  };

  return (
    <StyledWrapper className={className}>
      <Label label={label} meta={meta} disabled={disabled} />
      <StyledInputWrapper>
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
      <StyledList>
        {open &&
          inputItems.map((item) => (
            <OptionDrawer<T>
              key={item.id}
              onToggle={handleToggle}
              selectedItems={selectedItems}
              {...item}
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

MultiSelectDrawer.displayName = 'MultiSelectDrawer';

export default MultiSelectDrawer;
