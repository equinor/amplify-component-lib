import { forwardRef, useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Label,
  MultiSelectProps,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import OptionDrawer from './options/OptionDrawer';
import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionProps,
} from 'downshift';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

const { colors, spacings, elevation } = tokens;

const StyledWrapper = styled.div`
  overflow: hidden;
  width: 100%;
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
  margin: 0 16px;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 50;
`;

const getAllItems = (items: Item[]): Item[] => {
  if (items.length === 0) {
    return [];
  }

  let options: Item[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.children);
    options = [item, ...options, ...children];
  });

  return options;
};

export interface Item {
  value: string;
  label: string;
  children: Item[];
}

export type SelectProps = {
  items: Item[];
  onChange: (values: string[]) => void;
} & Omit<MultiSelectProps, 'items'>;

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      disabled = false,
      handleSelectedItemsChange,
      initialSelectedItems = [],
      items = [],
      label,
      meta,
      readOnly = false,
      selectedOptions,
      ...other
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const isControlled = selectedOptions !== undefined ? true : false;
    const options = getAllItems(items);
    console.log(options);

    let multipleSelectionProps: UseMultipleSelectionProps<string> = {
      initialSelectedItems: initialSelectedItems,
      onSelectedItemsChange: (changes) => {
        if (handleSelectedItemsChange) {
          handleSelectedItemsChange(changes);
        }
      },
    };

    if (isControlled) {
      multipleSelectionProps = {
        ...multipleSelectionProps,
        selectedItems: selectedOptions,
      };
    }

    const {
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection(multipleSelectionProps);

    const getFilteredItems = (_items: Item[]) =>
      _items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );

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
      inputValue,
      selectedItem: null,
      items: getFilteredItems(items),
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep menu open after selection.
              highlightedIndex: state.highlightedIndex,
              inputValue: '', // don't add the item string as input value at selection. */
            };
          case useCombobox.stateChangeTypes.InputBlur:
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
            setInputValue(inputValue ?? '');
            break;
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            if (selectedItem) {
              setInputValue('');

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

    const placeholderText =
      items.length > 0
        ? `${selectedItems
            .map(
              (selected) =>
                options.find((item) => item.value === selected)?.label
            )
            .join(', ')}`
        : '';

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
            placeholder={placeholderText}
            readOnly={readOnly}
            onFocus={handleOpen}
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
        {isOpen && (
          <StyledList {...getMenuProps()}>
            {getFilteredItems(items).map((item, index) => (
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
        )}
      </StyledWrapper>
    );
  }
);

Select.displayName = 'Select';

export default Select;
