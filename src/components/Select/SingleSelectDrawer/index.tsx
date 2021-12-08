import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Label,
  SingleSelectProps,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useCombobox } from 'downshift';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { OptionDrawer, SelectItem } from '..';

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

const getAllItems = (items: SelectItem[] | undefined): SelectItem[] => {
  if (items === undefined || items.length === 0) {
    return [];
  }

  let options: SelectItem[] = [];

  items.forEach((item) => {
    const children = getAllItems(item.children);
    options = [item, ...options, ...children];
  });

  return options;
};

export type SingleSelectDrawerProps = {
  items: SelectItem[];
  onChange: (item: SelectItem | null) => void;
  initialSelectedItem?: SelectItem;
} & Omit<SingleSelectProps, 'items' | 'initialSelectedItem' | 'onChange'>;

const SingleSelectDrawer = forwardRef<HTMLDivElement, SingleSelectDrawerProps>(
  (
    {
      className,
      disabled = false,
      onChange,
      initialSelectedItem,
      items = [],
      label,
      meta,
      readOnly = false,
      ...other
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState<SelectItem | undefined>(
      initialSelectedItem
    );
    const [inputItems, setInputItems] = useState<SelectItem[]>(items);
    const options = getAllItems(items);

    useEffect(() => {
      setInputItems(items);
    }, [items]);

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
      closeMenu,
    } = useCombobox({
      items: inputItems,
      selectedItem:
        options.find((item) => item.value === selectedValue?.value) ?? null,
      itemToString: (item) => (item ? item?.label : ''),
      onInputValueChange: ({ inputValue, type }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputChange:
            setInputItems(
              items.filter((item) =>
                item.label
                  .toLowerCase()
                  .includes(inputValue?.toLowerCase() ?? '')
              )
            );
            break;
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            setInputItems(items);
            break;
        }
      },
      onIsOpenChange: () => {
        setInputItems(items);
      },
      initialSelectedItem: options.find(
        (item) => item.value === initialSelectedItem?.value
      ),
    });

    const handleOpen = () => {
      if (!isOpen) openMenu();
    };

    const handleToggle = (value: SelectItem, toggle: boolean) => {
      if (toggle) {
        setSelectedValue(value);
        onChange(value);
        closeMenu();
      } else {
        setSelectedValue(undefined);
        onChange(null);
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
            {...getInputProps({ disabled: disabled })}
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
        <StyledList {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <OptionDrawer
                key={item.value}
                onToggle={handleToggle}
                highlighted={highlightedIndex === index ? 'true' : 'false'}
                values={selectedValue ? [selectedValue] : []}
                {...item}
                {...getItemProps({
                  item,
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

SingleSelectDrawer.displayName = 'SingleSelectDrawer';

export default SingleSelectDrawer;
