import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { CircularProgress, Icon, Label, Menu } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  ClearButton,
  Container,
  PlaceholderText,
  Section,
  StyledChip,
} from './ComboBox.styles';
import {
  ComboBoxOption,
  ComboBoxOptionRequired,
  ComboBoxProps,
  GroupedComboboxProps,
} from './ComboBox.types';
import { ComboBoxMenu } from './ComboBoxMenu';
import { GroupedComboBoxMenu } from './GroupedComboBoxMenu';

const { colors } = tokens;

export type ComboBoxComponentProps<T extends ComboBoxOptionRequired> = {
  label?: string;
  placeholder?: string;
  sortValues?: boolean;
  disabled?: boolean;
  loading?: boolean;
  lightBackground?: boolean;
  underlineHighlight?: boolean;
  clearable?: boolean;
} & (ComboBoxProps<T> | GroupedComboboxProps<T>);

export const ComboBox = <T extends ComboBoxOptionRequired>(
  props: ComboBoxComponentProps<T>
) => {
  const {
    clearable = true,
    loading = false,
    disabled = false,
    sortValues = true,
    lightBackground = false,
    underlineHighlight = false,
    placeholder = 'Select...',
    label,
  } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusingItemIndex = useRef<number>(-1);
  const [tryingToRemoveItem, setTryingToRemoveItem] = useState<T | undefined>(
    undefined
  );
  const internalUpdateOfValues = useRef<boolean>(false);
  const previousAmountOfValues = useRef<number>(0);

  if ('groups' in props && 'items' in props) {
    throw new Error("Can't use both items and groups!");
  }

  const selectedValues: T[] = useMemo(() => {
    let selected: T[] = [];
    if ('values' in props) {
      selected = props.values;
    } else if (props.value) {
      selected = [props.value];
    }

    if (!sortValues) return selected;

    let flattenedItems: T[];
    if ('groups' in props) {
      flattenedItems = props.groups.flatMap((group) => group.items);
    } else {
      flattenedItems = props.items.flatMap((item) => [
        { ...item },
        ...(item.children! || []),
      ]);
    }

    return selected.sort((a, b) => {
      const firstIndex = flattenedItems.findIndex(
        (item) => item.value === a.value
      );
      const secondIndex = flattenedItems.findIndex(
        (item) => item.value === b.value
      );
      return firstIndex - secondIndex;
    });
  }, [props, sortValues]);

  useEffect(() => {
    if (
      internalUpdateOfValues.current &&
      previousAmountOfValues.current !== selectedValues.length
    ) {
      previousAmountOfValues.current = selectedValues.length;
      internalUpdateOfValues.current = false;
      searchRef.current?.focus();
    }
  }, [selectedValues.length]);

  const handleOnOpen = () => {
    if (!open && !disabled && !loading) {
      searchRef.current?.focus();
      setOpen(true);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setSearch('');
    focusingItemIndex.current = 0;
  };

  const handleToggleOpen = () => {
    if (disabled || loading) return;

    if (open) {
      handleOnClose();
    } else {
      handleOnOpen();
    }
  };

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ' ' || loading || disabled) return;
    setSearch(event.target.value);
    if (!open) {
      setOpen(true);
    }
  };

  const handleOnItemSelect = (item: ComboBoxOption<T>) => {
    if ('value' in props) {
      props.onSelect(item);
    } else if (
      props.values.find((i) => i.value === item.value) &&
      ('groups' in props || props.selectableParent === false)
    ) {
      props.onSelect(
        props.values.filter((i) => i.value !== item.value),
        item
      );
    } else if (props.values.find((i) => i.value === item.value)) {
      // Remove parent with all children
      const copiedItem = structuredClone(item);
      const removingValues: string[] = [copiedItem.value];
      const childItems = copiedItem.children ?? [];
      while (childItems.length > 0) {
        const child = childItems.splice(0, 1)[0];
        removingValues.push(child.value);
      }
      props.onSelect(
        props.values.filter((i) => !removingValues.includes(i.value)),
        item
      );
    } else if ('groups' in props || props.selectableParent === false) {
      props.onSelect([...props.values, item], item);
    } else {
      // Add parent with all children
      const copiedItem = structuredClone(item);
      const newValues = [copiedItem];
      const childItems = copiedItem.children ?? [];
      while (childItems.length > 0) {
        const child = childItems.splice(0, 1)[0];
        if (!props.values.find((value) => value.value === child.value)) {
          newValues.push(child);
        }
      }
      props.onSelect([...props.values, ...newValues], item);
    }

    if (search !== '') {
      setSearch('');
    }
    internalUpdateOfValues.current = true;
  };

  const handleOnRemoveItem = (item: T) => {
    if ('value' in props) props.onSelect(undefined);
    else {
      props.onSelect(
        props.values.filter((i) => i.value !== item.value),
        item
      );
    }
  };

  const handleOnClear = () => {
    if ('value' in props) props.onSelect(undefined);
    else {
      props.onSelect([]);
    }
  };

  const handleOnSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Space' || event.key === 'Enter') {
      handleOnOpen();
    } else if (event.key === 'Escape') {
      searchRef.current?.blur();
      handleOnClose();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (itemRefs.current.at(0)) {
        itemRefs.current[0]?.focus();
        focusingItemIndex.current = 0;
      }
    } else if (
      event.key === 'Backspace' &&
      tryingToRemoveItem === undefined &&
      search === ''
    ) {
      setTryingToRemoveItem(selectedValues?.at(-1));
    } else if (event.key === 'Backspace' && tryingToRemoveItem) {
      handleOnRemoveItem(tryingToRemoveItem);
      setTryingToRemoveItem(undefined);
    }
  };

  const handleOnItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === 'ArrowDown' &&
      focusingItemIndex.current < itemRefs.current.length - 1
    ) {
      focusingItemIndex.current += 1;
      itemRefs.current.at(focusingItemIndex.current)?.focus();
    } else if (event.key === 'ArrowUp' && focusingItemIndex.current > 0) {
      focusingItemIndex.current -= 1;
      itemRefs.current.at(focusingItemIndex.current)?.focus();
    } else if (event.key === 'ArrowUp' && focusingItemIndex.current === 0) {
      focusingItemIndex.current = -1;
      searchRef.current?.focus();
    }
  };

  return (
    <div>
      <Container
        data-testid="combobox-container"
        ref={anchorRef}
        onClick={handleOnOpen}
        aria-expanded={open}
        $underlineHighlight={underlineHighlight}
        $lightBackground={lightBackground}
      >
        {label && <Label label={label} htmlFor="amplify-combobox" />}
        <Section>
          {selectedValues.length > 0 || search !== '' ? (
            selectedValues.map((value) => (
              <StyledChip
                key={value.value}
                data-testid="amplify-combobox-chip"
                className="amplify-combo-box-chip"
                onDelete={() => {
                  if (!loading && !disabled) {
                    handleOnRemoveItem(value);
                  }
                }}
                $tryingToRemove={tryingToRemoveItem?.value === value.value}
                $lightBackground={lightBackground}
              >
                {value.label}
              </StyledChip>
            ))
          ) : (
            <PlaceholderText>{placeholder}</PlaceholderText>
          )}
          <input
            id="amplify-combobox"
            disabled={disabled || loading}
            ref={searchRef}
            type="search"
            role="combobox"
            value={search}
            autoComplete="off"
            onChange={handleOnSearchChange}
            onKeyDownCapture={handleOnSearchKeyDown}
          />
        </Section>
        {loading ? (
          <CircularProgress size={16} />
        ) : (
          <Icon
            onClick={handleToggleOpen}
            data={open ? arrow_drop_up : arrow_drop_down}
            color={colors.text.static_icons__default.rgba}
          />
        )}
        {clearable && selectedValues.length > 0 && !loading && (
          <ClearButton variant="ghost_icon" onClick={handleOnClear}>
            <Icon data={clear} size={18} />
          </ClearButton>
        )}
      </Container>
      {open && (
        <Menu
          open
          id="combobox-menu"
          anchorEl={anchorRef.current}
          onClose={handleOnClose}
          placement="bottom"
          matchAnchorWidth
          style={{
            maxHeight: '20rem',
            overflow: 'auto',
          }}
        >
          {'groups' in props ? (
            <GroupedComboBoxMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
            />
          ) : (
            <ComboBoxMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              selectableParent={
                'values' in props ? props.selectableParent : false
              }
            />
          )}
        </Menu>
      )}
    </div>
  );
};
