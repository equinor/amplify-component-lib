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
import {
  ClearButton,
  Container,
  HelperWrapper,
  PlaceholderText,
  Section,
  StyledChip,
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
    helperText,
    meta,
    id = `amplify-combobox-${label}`,
    variant,
    inDialog = false,
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
    handleOnMouseEnterItem,
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
    switch (variant) {
      case 'error':
        return error_filled;
      case 'warning':
        return warning_filled;
      case 'success':
        return thumbs_up;
    }
  }, [variant]);

  // Not able to test this properly because the menu onClose works inside a dialog in the test env :(
  /* c8 ignore start */
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
  /* c8 ignore end */

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
      {shouldShowLabel && <Label label={label} meta={meta} htmlFor={id} />}
      <Wrapper>
        <Container
          data-testid="combobox-container"
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
          {props.groups ? (
            <GroupedSelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              onMouseEnterItem={handleOnMouseEnterItem}
            />
          ) : (
            <SelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              onMouseEnterItem={handleOnMouseEnterItem}
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
