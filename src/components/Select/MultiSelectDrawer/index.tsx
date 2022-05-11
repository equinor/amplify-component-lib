import {
  Button,
  Icon,
  Input,
  Label,
  MultiSelectProps,
} from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { useCombobox, useMultipleSelection } from 'downshift';
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

const getAllItems = <T,>(
  items: SelectItem<T>[] | undefined
): SelectItem<T>[] => {
  if (items === undefined || items.length === 0) {
    return [];
  }

  let options: SelectItem<T>[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.items);
    options = [item, ...options, ...children];
  });

  return options;
};

export type MultiSelectDrawerProps<T> = {
  items: SelectItem<T>[];
  onChange: (items: SelectItem<T>[]) => void;
  initialSelectedItems: SelectItem<T>[];
  compare: (item1: T, item2: T) => boolean;
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
  compare,
  ...other
}: MultiSelectDrawerProps<T>) => {
  const options = getAllItems(items);

  const [inputItems, setInputItems] = useState<SelectItem<T>[]>(items);
  const [value, setValue] = useState<string>(
    initialSelectedItems.map((item) => item.label).join(', ')
  );

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<T>({
    initialSelectedItems: initialSelectedItems.map((item) => item.value),
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
  } = useCombobox({
    items: inputItems,
    selectedItem: null,
    itemToString: (item) => (item ? item.label : ''),
    stateReducer: (state, { changes, type }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          setInputItems(
            items.filter((item) =>
              item.label.toLowerCase().includes(value.toLowerCase() ?? '')
            )
          );
          return {
            ...changes,
            isOpen: true, // keep menu open after selection.
            highlightedIndex: state.highlightedIndex,
            inputValue: '', // don't add the item string as input value at selection. */
          };
        case useCombobox.stateChangeTypes.InputBlur:
          setValue('');
          setInputItems(items);
          return {
            ...changes,
            inputValue: '', // don't add the item string as input value at selection.
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setValue(inputValue ?? '');
          setInputItems(
            items.filter((item) =>
              item.label.toLowerCase().includes(value?.toLowerCase() ?? '')
            )
          );
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          onChange(
            options.filter((item) => selectedItems.includes(item.value))
          );
          if (selectedItem) {
            if (
              initialSelectedItems
                .map((item) => item.value)
                .includes(selectedItem.value)
            ) {
              setInputItems(items);
            }

            if (selectedItems.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem.value);
            } else {
              addSelectedItem(selectedItem.value);
            }
          }
          break;
        default:
          break;
      }
    },
  });

  const selectedValues =
    selectedItems.length > 0
      ? `${selectedItems
          .map(
            (selected) => options.find((item) => item.value === selected)?.label
          )
          .join(', ')}`
      : undefined;

  const handleOpen = () => {
    if (!isOpen) openMenu();
  };

  const handleToggle = (item: SelectItem<T>, toggle: boolean) => {
    if (toggle) {
      addSelectedItem(item.value);
    } else {
      removeSelectedItem(item.value);
    }
  };

  return (
    <StyledWrapper className={className}>
      <Label
        {...getLabelProps()}
        label={label}
        meta={meta}
        disabled={disabled}
      />
      <StyledInputWrapper {...getComboboxProps()}>
        <Input
          {...getInputProps(
            getDropdownProps({
              preventKeyAction: isOpen,
              disabled: disabled,
            })
          )}
          value={value}
          readOnly={readOnly}
          onFocus={handleOpen}
          placeholder={selectedValues ?? placeholder}
          values={value}
          {...other}
        />
        <StyledButton
          variant="ghost_icon"
          {...getToggleButtonProps({ disabled: disabled || readOnly })}
          aria-label="toggle options"
          title="open"
        >
          <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
        </StyledButton>
      </StyledInputWrapper>
      <StyledList {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <OptionDrawer
              key={item.value}
              onToggle={handleToggle}
              highlighted={highlightedIndex === index ? 'true' : 'false'}
              values={options.filter((item) =>
                selectedItems.includes(item.value)
              )}
              compare={compare}
              {...item}
              {...getItemProps({
                item: item,
                index,
                disabled: disabled,
              })}
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

MultiSelectDrawer.displayName = 'MultiSelectDrawer';

export default MultiSelectDrawer;
