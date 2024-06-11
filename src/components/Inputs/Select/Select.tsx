import { useMemo, useRef } from 'react';

import { CircularProgress, Icon, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { GroupedSelectMenu } from './GroupedSelectMenu';
import {
  ClearButton,
  Container,
  PlaceholderText,
  Section,
  StyledChip,
  StyledMenu,
} from './Select.styles';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
  SingleSelectCommon,
} from './Select.types';
import { SelectMenu } from './SelectMenu';
import { useSelect } from 'src/hooks/useSelect';

const { colors } = tokens;

export type SelectComponentProps<T extends SelectOptionRequired> =
  CommonSelectProps &
    (SingleSelectCommon<T> | MultiSelectCommon<T>) &
    (ListSelectProps<T> | GroupedSelectProps<T>);

export const Select = <T extends SelectOptionRequired>(
  props: SelectComponentProps<T>
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
    meta,
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
  } = useSelect(props);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleChipRemoval = (value: T) => () => {
    if (!loading && !disabled) {
      handleOnRemoveItem(value);
    }
  };

  const shouldShowTopMargin = useMemo(() => {
    return !!label || !!meta;
  }, [label, meta]);

  return (
    <div>
      <Container
        data-testid="combobox-container"
        ref={anchorRef}
        onClick={handleOnOpen}
        aria-expanded={open}
        $underlineHighlight={underlineHighlight}
        $lightBackground={lightBackground}
        $shouldShowTopMargin={shouldShowTopMargin}
      >
        {shouldShowTopMargin && (
          <Label
            label={label}
            meta={meta}
            htmlFor={id ? id : `amplify-combobox-${label}-${meta}`}
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
      {open && (
        <StyledMenu
          open
          id="combobox-menu"
          anchorEl={anchorRef.current}
          onClose={handleOnClose}
          placement="bottom"
          matchAnchorWidth
        >
          {'groups' in props ? (
            <GroupedSelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
            />
          ) : (
            <SelectMenu
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
      )}
    </div>
  );
};
