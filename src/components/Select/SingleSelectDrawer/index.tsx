import {
  Button,
  Icon,
  Input,
  Label,
  SingleSelectProps,
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

export type SingleSelectDrawerProps<T> = {
  items: SelectItem<T>[];
  onChange: (item: string | null) => void;
  initialSelectedItem?: string;
} & Omit<SingleSelectProps, 'items' | 'initialSelectedItem' | 'onChange'>;

const SingleSelectDrawer = <T,>({
  className,
  disabled = false,
  onChange,
  initialSelectedItem,
  items = [],
  label,
  meta,
  readOnly = false,
  placeholder,
}: SingleSelectDrawerProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    initialSelectedItem
  );
  const [inputItems, setInputItems] = useState<SelectItem<T>[]>(items);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

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

  const handleToggle = (id: string, toggle: boolean) => {
    if (toggle) {
      setSelectedItem(id);
      onChange(id);
    } else {
      setSelectedItem(undefined);
      onChange(null);
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
              selectedItems={selectedItem ? [selectedItem] : []}
              singleSelect
              {...item}
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

SingleSelectDrawer.displayName = 'SingleSelectDrawer';

export default SingleSelectDrawer;
