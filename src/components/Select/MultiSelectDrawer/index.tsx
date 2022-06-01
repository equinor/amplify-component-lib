import { Button, Icon, Input, Label } from '@equinor/eds-core-react';
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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

export type MultiSelectDrawerProps<T> = {
  disabled?: boolean;
  id?: string;
  items: SelectItem<T>[];
  label: string;
  meta?: string;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  style?: CSSProperties;
};

const MultiSelectDrawer = <T,>({
  disabled = false,
  id,
  items = [],
  label,
  meta,
  onChange,
  placeholder,
  readOnly = false,
  selectedItems = [],
  setSelectedItems,
  style,
}: MultiSelectDrawerProps<T>) => {
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
    onChange && onChange(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  const handleToggle = (id: string, toggle: boolean) => {
    if (toggle) {
      setSelectedItems((items) => [...items, id]);
    } else {
      setSelectedItems((items) => items.filter((i) => i !== id));
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
              {...item}
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

MultiSelectDrawer.displayName = 'MultiSelectDrawer';

export default MultiSelectDrawer;
