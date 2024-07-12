import { useMemo, useRef } from 'react';

import { CircularProgress, Icon, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useSelect } from 'src/atoms/hooks/useSelect';
import { GroupedSelectMenu } from 'src/molecules/Select/GroupedSelectMenu';
import {
  ClearButton,
  Container,
  PlaceholderText,
  Section,
  StyledChip,
  StyledMenu,
  ValueText,
} from 'src/molecules/Select/Select.styles';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import { SelectMenu } from 'src/molecules/Select/SelectMenu';

const { colors } = tokens;

export type SelectComponentProps<T extends SelectOptionRequired> =
  CommonSelectProps &
    (SingleSelectCommon<T> | MultiSelectCommon<T>) &
    (ListSelectProps<T> | GroupedSelectProps<T>);

export const Select = <T extends SelectOptionRequired>(
  props: SelectComponentProps<T>
) => {
  const {
    clearable = true,
    loading = false,
    disabled = false,
    lightBackground = false,
    underlineHighlight = false,
    sortValues = true,
    placeholder = 'Select...',
    label,
    meta,
    id = `amplify-combobox-${label}`,
    variant,
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
  } = useSelect({
    ...props,
    clearable,
    loading,
    disabled,
    lightBackground,
    underlineHighlight,
    sortValues,
    placeholder,
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const shouldShowTopMargin = useMemo(() => {
    return !!label || !!meta;
  }, [label, meta]);

  const valueElements = useMemo(() => {
    if ('value' in props && props.value) {
      return <ValueText>{props.value.label}</ValueText>;
    } else {
      return selectedValues.map((value) => (
        <StyledChip
          key={value.value}
          data-testid="amplify-combobox-chip"
          className="amplify-combo-box-chip"
          onDelete={() => handleOnRemoveItem(value)}
          $tryingToRemove={tryingToRemoveItem?.value === value.value}
          $lightBackground={lightBackground}
        >
          {value.label}
        </StyledChip>
      ));
    }
  }, [
    selectedValues,
    tryingToRemoveItem,
    lightBackground,
    props,
    handleOnRemoveItem,
  ]);

  return (
    <div>
      <Container
        data-testid="combobox-container"
        ref={anchorRef}
        onClick={handleOnOpen}
        aria-expanded={open}
        $variant={variant}
        $lightBackground={lightBackground}
        $shouldShowTopMargin={shouldShowTopMargin}
      >
        {shouldShowTopMargin && (
          <Label label={label} meta={meta} htmlFor={id} />
        )}
        <Section>
          {search === '' && selectedValues.length === 0 && (
            <PlaceholderText>{placeholder}</PlaceholderText>
          )}
          {(search === '' ||
            ('values' in props && selectedValues.length > 0)) &&
            valueElements}
          <input
            id={id}
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
          {props.groups ? (
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
