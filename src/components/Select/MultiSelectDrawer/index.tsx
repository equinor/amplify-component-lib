import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Label,
  MultiSelectProps,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import OptionDrawer from '../Options/OptionDrawer';
import { useCombobox, useMultipleSelection } from 'downshift';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { Item } from '../types';

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

const getAllItems = (items: Item[] | undefined): Item[] => {
  if (items === undefined || items.length === 0) {
    return [];
  }

  let options: Item[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.children);
    options = [item, ...options, ...children];
  });

  return options;
};

export type MultiSelectDrawerProps = {
  items: Item[];
  onChange: (values: string[]) => void;
} & Omit<MultiSelectProps, 'items'>;

const MultiSelectDrawer = forwardRef<HTMLDivElement, MultiSelectDrawerProps>(
  (
    {
      className,
      disabled = false,
      initialSelectedItems = [],
      items = [],
      label,
      onChange,
      meta,
      readOnly = false,
      placeholder,
      ...other
    },
    ref
  ) => {
    const options = getAllItems(items);

    const [inputItems, setInputItems] = useState<Item[]>(items);
    const [value, setValue] = useState<string>(
      initialSelectedItems
        .map((value) => options.find((item) => item.value === value)?.label)
        .join(', ')
    );

    useEffect(() => {
      setInputItems(items);
    }, [items]);

    const {
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection({
      initialSelectedItems: initialSelectedItems,
    });

    useEffect(() => {
      onChange(selectedItems);
    }, [onChange, selectedItems]);

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
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
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
            if (selectedItem) {
              if (initialSelectedItems.includes(selectedItem.value)) {
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
      items.length > 0
        ? `${selectedItems
            .map(
              (selected) =>
                options.find((item) => item.value === selected)?.label
            )
            .join(', ')}`
        : undefined;

    const handleOpen = () => {
      if (!isOpen) openMenu();
    };

    const handleToggle = (value: string, toggle: boolean) => {
      if (toggle) {
        addSelectedItem(value);
      } else {
        removeSelectedItem(value);
      }
    };

    return (
      <StyledWrapper className={className} ref={ref}>
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
                values={selectedItems}
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
  }
);

MultiSelectDrawer.displayName = 'MultiSelectDrawer';

export default MultiSelectDrawer;
