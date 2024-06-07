import { useRef } from 'react';

import { CircularProgress, Icon, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  ClearButton,
  Container,
  PlaceholderText,
  Section,
  StyledChip,
  StyledMenu,
} from './ComboBox.styles';
import {
  ComboBoxOptionRequired,
  ComboBoxProps,
  GroupedComboboxProps,
} from './ComboBox.types';
import { ComboBoxMenu } from './ComboBoxMenu';
import { GroupedComboBoxMenu } from './GroupedComboBoxMenu';
import { useComboBox } from 'src/hooks/useComboBox';

const { colors } = tokens;

export type ComboBoxComponentProps<T extends ComboBoxOptionRequired> = {
  id?: string;
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
    id,
    clearable = true,
    loading = false,
    disabled = false,
    lightBackground = false,
    underlineHighlight = false,
    placeholder = 'Select...',
    label,
  } = props;
  const {
    handleOnClear,
    handleOnItemKeyDown,
    handleOnItemSelect,
    handleOnSearchChange,
    handleOnSearchKeyDown,
    handleToggleOpen,
    itemRefs,
    search,
    selectedValues,
    handleOnClose,
    handleOnOpen,
    handleOnRemoveItem,
    open,
    searchRef,
    tryingToRemoveItem,
  } = useComboBox(props);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleChipRemoval = (value: T) => () => {
    if (!loading && !disabled) {
      handleOnRemoveItem(value);
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
        $label={!!label}
      >
        {label && (
          <Label
            label={label}
            htmlFor={id ? id : `amplify-combobox-${label}`}
          />
        )}
        <Section>
          {selectedValues.length > 0 || search !== '' ? (
            selectedValues.map((value) => (
              <StyledChip
                key={value.value}
                data-testid="amplify-combobox-chip"
                className="amplify-combo-box-chip"
                onClick={handleChipRemoval(value)}
                onDelete={handleChipRemoval(value)}
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
            id={id ? id : `amplify-combobox-${label}`}
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
            color={colors.interactive.primary__resting.rgba}
          />
        )}
        {clearable && selectedValues.length > 0 && !loading && (
          <ClearButton
            variant="ghost_icon"
            onClick={handleOnClear}
            data-testid="clearBtn"
          >
            <Icon data={clear} size={18} />
          </ClearButton>
        )}
      </Container>
      <StyledMenu
        open={open}
        id="combobox-menu"
        data-testid="menu-list"
        anchorEl={anchorRef.current}
        onClose={handleOnClose}
        placement="bottom"
        matchAnchorWidth
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
      </StyledMenu>
    </div>
  );
};
