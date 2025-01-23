import { useMemo, useRef } from 'react';

import { CircularProgress, Icon, Label } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  clear,
  error_filled,
  thumbs_up,
  warning_filled,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { useSelect } from 'src/atoms/hooks/useSelect';
import { GroupedSelectMenu } from 'src/molecules/Select/GroupedSelectMenu';
import { ListSelectMenu } from 'src/molecules/Select/ListSelectMenu';
import {
  ClearButton,
  ComboBoxChip,
  Container,
  HelperWrapper,
  PlaceholderText,
  Section,
  StyledMenu,
  ValueText,
  Wrapper,
} from 'src/molecules/Select/Select.styles';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MultiSelectCommon,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';

const { colors } = tokens;

export type SelectComponentProps<T extends SelectOptionRequired> =
  CommonSelectProps<T> &
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
    helperText,
    showHelperIcon = true,
    meta,
    id = `amplify-combobox-${label}`,
    variant,
    inDialog = false,
    onSearchFilter,
    'data-testid': dataTestId,
  } = props;
  const {
    handleOnAddItem,
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const shouldShowLabel = useMemo(() => {
    return !!label || !!meta;
  }, [label, meta]);
  const shouldShowHelper = useMemo(() => {
    return !!helperText;
  }, [helperText]);
  const helperIcon = useMemo(() => {
    if (!showHelperIcon) return;

    switch (variant) {
      case 'error':
        return error_filled;
      case 'warning':
        return warning_filled;
      case 'success':
        return thumbs_up;
    }
  }, [showHelperIcon, variant]);

  // Not able to test this properly because the menu onClose works inside a dialog in the test env :(
  /* v8 ignore start */
  useOutsideClick(menuRef.current, (event) => {
    if (
      inDialog &&
      open &&
      event.target &&
      anchorRef.current &&
      menuRef.current &&
      !anchorRef.current.contains(event.target as Node) &&
      !menuRef.current?.contains(event.target as Node)
    ) {
      handleOnClose();
    }
  });
  /* v8 ignore end */

  const valueElements = useMemo(() => {
    if ('value' in props && props.value) {
      return <ValueText>{props.value.label}</ValueText>;
    } else {
      return selectedValues.map((value) => {
        if ('customValueComponent' in props && props.customValueComponent) {
          return (
            <props.customValueComponent
              key={value.value}
              item={value}
              onDelete={() => handleOnRemoveItem(value)}
              tryingToRemove={
                tryingToRemoveItem !== undefined &&
                tryingToRemoveItem.value === value.value
              }
            />
          );
        }
        return (
          <ComboBoxChip
            key={value.value}
            data-testid="amplify-combobox-chip"
            className="amplify-combo-box-chip"
            onDelete={() => handleOnRemoveItem(value)}
            $tryingToRemove={tryingToRemoveItem?.value === value.value}
            $lightBackground={lightBackground}
          >
            {value.label}
          </ComboBoxChip>
        );
      });
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
      {shouldShowLabel && <Label label={label} meta={meta} htmlFor={id} />}
      <Wrapper>
        <Container
          data-testid={dataTestId ? dataTestId : 'combobox-container'}
          ref={anchorRef}
          onClick={handleOnOpen}
          aria-expanded={open}
          $variant={variant}
          $lightBackground={lightBackground}
        >
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
              id="clear"
              variant="ghost_icon"
              onClick={handleOnClear}
              data-testid="clearBtn"
            >
              <Icon data={clear} size={18} />
            </ClearButton>
          )}
        </Container>
        {shouldShowHelper && (
          <HelperWrapper $variant={variant}>
            {helperIcon && <Icon data={helperIcon} size={16} />}
            <Label label={helperText} htmlFor={id} />
          </HelperWrapper>
        )}
      </Wrapper>
      {open && (
        <StyledMenu
          ref={menuRef}
          open
          id="combobox-menu"
          anchorEl={anchorRef.current}
          onClose={handleOnClose}
          placement="bottom"
          style={{
            width: `${anchorRef.current?.clientWidth}px`,
            maxWidth: `${anchorRef.current?.clientWidth}px`,
          }}
        >
          {'groups' in props && props.groups ? (
            <GroupedSelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              onSearchFilter={onSearchFilter}
            />
          ) : (
            <ListSelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onAddItem={
                'values' in props && props.onAddItem
                  ? handleOnAddItem
                  : undefined
              }
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              onSearchFilter={onSearchFilter}
            />
          )}
        </StyledMenu>
      )}
    </div>
  );
};
