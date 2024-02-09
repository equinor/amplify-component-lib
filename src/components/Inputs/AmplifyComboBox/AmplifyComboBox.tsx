import { ChangeEvent, KeyboardEvent, useMemo, useRef, useState } from 'react';

import { Chip, Icon, Label, Menu } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  AmplifyComboBoxProps,
  AmplifyGroupedComboboxProps,
  ComboBoxOption,
} from './AmplifyComboBox.types';
import AmplifyComboBoxMenu from './AmplifyComboBoxMenu';
import AmplifyGroupedComboBoxMenu from './AmplifyGroupedComboBoxMenu';
import { spacings } from 'src/style/spacings';

import styled from 'styled-components';

const { colors } = tokens;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  box-shadow: inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba};
  padding: ${spacings.medium_small} ${spacings.medium};
  &[aria-expanded='true'] {
    box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
  }
  margin-top: 0.75rem;
  > label {
    position: absolute;
    top: -0.75rem;
    left: 0;
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.x_small};
  input[type='search'] {
    background: transparent;
    width: 0;
    flex-grow: 1;
    padding: 0;
    font-family: 'Equinor', sans-serif;
    outline: none;
    border: none;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    appearance: none;
  }
`;

interface StyledChipProps {
  $tryingToRemove: boolean;
}

const StyledChip = styled(Chip)<StyledChipProps>`
  background: ${({ $tryingToRemove }) =>
    $tryingToRemove
      ? colors.interactive.primary__hover_alt.rgba
      : colors.ui.background__default.rgba};
`;

export type AmplifyComboBoxComponentProps<T extends ComboBoxOption<T>> = {
  label: string;
} & (AmplifyComboBoxProps<T> | AmplifyGroupedComboboxProps<T>);

const AmplifyComboBox = <T extends ComboBoxOption<T>>(
  props: AmplifyComboBoxComponentProps<T>
) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusingItemIndex = useRef<number>(-1);
  const [tryingToRemoveItem, setTryingToRemoveItem] = useState<T | undefined>(
    undefined
  );

  const selectedValues: T[] = useMemo(() => {
    if ('values' in props) return props.values;
    if (props.value) return [props.value];
    return [];
  }, [props]);

  const handleOnOpen = () => {
    if (!open) {
      searchRef.current?.focus();
      setOpen(true);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setSearch('');
    focusingItemIndex.current = 0;
  };

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnItemSelect = (item: T) => {
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
      // Remove parent with all children/grandchildren etc.
      const copiedItem = JSON.parse(JSON.stringify(item));
      const removingValues: string[] = [copiedItem.value];
      const childItems = copiedItem.children || [];
      while (childItems.length > 0) {
        const child = childItems.splice(0, 1)[0];
        if (child.children) {
          childItems.push(...child.children);
        }
        removingValues.push(child.value);
      }
      props.onSelect(
        props.values.filter((i) => !removingValues.includes(i.value)),
        item
      );
    } else if ('groups' in props || props.selectableParent === false) {
      props.onSelect([...props.values, item], item);
    } else {
      // Add parent with all children/grandchildren etc.
      const copiedItem = JSON.parse(JSON.stringify(item));
      const newValues = [copiedItem];
      const childItems = copiedItem.children || [];
      while (childItems.length > 0) {
        const child = childItems.splice(0, 1)[0];
        if (child.children) {
          childItems.push(...child.children);
        }
        if (!props.values.find((value) => value.value === child.value)) {
          newValues.push(child);
        }
      }
      props.onSelect([...props.values, ...newValues], item);
    }

    if (search !== '') setSearch('');
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

  const handleOnSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
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
    }
  };

  return (
    <>
      <Container ref={anchorRef} onClick={handleOnOpen} aria-expanded={open}>
        <Label label={props.label} htmlFor="amplify-combobox" />
        <Section>
          {selectedValues.map((value) => (
            <StyledChip
              key={value.value}
              onDelete={() => handleOnRemoveItem(value)}
              $tryingToRemove={tryingToRemoveItem?.value === value.value}
            >
              {value.label}
            </StyledChip>
          ))}
          <input
            id="amplify-combobox"
            ref={searchRef}
            type="search"
            role="combobox"
            value={search}
            autoComplete="off"
            onChange={handleOnSearchChange}
            onKeyDownCapture={handleOnSearchKeyDown}
          />
        </Section>
        <Icon
          data={open ? arrow_drop_up : arrow_drop_down}
          color={colors.text.static_icons__default.rgba}
        />
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
            <AmplifyGroupedComboBoxMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
            />
          ) : (
            <AmplifyComboBoxMenu
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
    </>
  );
};

export default AmplifyComboBox;
