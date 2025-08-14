import { useMemo, useRef } from 'react';

import { Icon, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';
import { useOutsideClick } from '@equinor/eds-utils';

import { useSelect } from 'src/atoms/hooks/useSelect';
import { colors } from 'src/atoms/style/colors';
import { getVariantIcon } from 'src/atoms/utils/forms';
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
import { SkeletonField } from 'src/molecules/Skeleton/SkeletonField';

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
    CustomMenuItemComponent,
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
  const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);
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

    return getVariantIcon(variant);
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
    if (
      'value' in props &&
      props.value &&
      'customValueComponent' in props &&
      props.customValueComponent
    ) {
      return <props.customValueComponent item={props.value} />;
    } else if ('value' in props && props.value) {
      return <ValueText>{props.value.label}</ValueText>;
    } else if ('showSelectedAsText' in props && props.showSelectedAsText) {
      const totalAmount = props.items
        ? props.items.length
        : props.groups.flatMap((group) => group.items).length;

      const text =
        typeof props.showSelectedAsText === 'function'
          ? props.showSelectedAsText({
              selectedAmount: selectedValues.length,
              totalAmount,
            })
          : `${selectedValues.length}/${totalAmount} Selected`;

      return <ValueText>{text}</ValueText>;
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
      {shouldShowLabel && (
        <Label label={label} meta={meta} htmlFor={id} disabled={disabled} />
      )}
      <Wrapper>
        <Container
          data-testid={dataTestId ? dataTestId : 'combobox-container'}
          ref={anchorRef}
          onClick={handleOnOpen}
          aria-expanded={open}
          $variant={variant}
          $loading={loading}
          $lightBackground={lightBackground}
        >
          <Section>
            {!loading && search === '' && selectedValues.length === 0 && (
              <PlaceholderText>{placeholder}</PlaceholderText>
            )}
            {((search === '' && 'value' in props) ||
              ('values' in props &&
                selectedValues.length > 0 &&
                (!props.showSelectedAsText ||
                  (props.showSelectedAsText && search === '')))) &&
              !loading &&
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
            {loading && (
              <SkeletonField
                role="progressbar"
                style={{
                  width: skeletonWidth.current,
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </Section>
          <Icon
            onClick={handleToggleOpen}
            data={open ? arrow_drop_up : arrow_drop_down}
            color={
              loading
                ? colors.interactive.disabled__fill.rgba
                : colors.interactive.primary__resting.rgba
            }
          />
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
          <HelperWrapper $variant={disabled ? 'disabled' : variant}>
            {helperIcon && <Icon data={helperIcon} size={16} />}
            <Label label={helperText} htmlFor={id} />
          </HelperWrapper>
        )}
      </Wrapper>
      {open && (
        <StyledMenu
          ref={menuRef}
          open
          key={`select-menu-${search}`}
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
              CustomMenuItemComponent={CustomMenuItemComponent}
            />
          ) : (
            <ListSelectMenu
              {...props}
              search={search}
              itemRefs={itemRefs}
              onAddItem={props.onAddItem ? handleOnAddItem : undefined}
              onItemSelect={handleOnItemSelect}
              onItemKeyDown={handleOnItemKeyDown}
              onSearchFilter={onSearchFilter}
              CustomMenuItemComponent={CustomMenuItemComponent}
            />
          )}
        </StyledMenu>
      )}
    </div>
  );
};
