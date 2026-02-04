import { useMemo, useRef } from 'react';

import { Label } from '@equinor/eds-core-react';
import { useOutsideClick } from '@equinor/eds-utils';

import { SelectItemSkeleton } from './SelectItemSkeleton';
import { useSelect } from 'src/atoms/hooks/useSelect';
import { InputExplanation } from 'src/molecules/InputExplanation/InputExplanation';
import { GroupedSelectMenu } from 'src/molecules/Select/GroupedSelectMenu';
import { GroupedSelectPersistent } from 'src/molecules/Select/GroupedSelectPersistent';
import { ListSelectMenu } from 'src/molecules/Select/ListSelectMenu';
import { ListSelectPersistent } from 'src/molecules/Select/ListSelectPersistent';
import { SearchBar } from 'src/molecules/Select/SearchBar';
import {
  LabelWrapper,
  PersistentComboBoxWrapper,
  PersistentStickyWrapper,
  StyledMenu,
} from 'src/molecules/Select/Select.styles';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  MenuModeSelectProps,
  MultiSelectCommon,
  PersistentModeSelectProps,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';
import { Label } from 'src/molecules/IconCell/IconCell.styles';

export type SelectComponentProps<T extends SelectOptionRequired> =
  CommonSelectProps<T> &
    (SingleSelectCommon<T> | MultiSelectCommon<T>) &
    (ListSelectProps<T> | GroupedSelectProps<T>) &
    (PersistentModeSelectProps | MenuModeSelectProps);

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
    inDialog = false,
    onSearchFilter,
    CustomMenuItemComponent,
    mode = 'menu',
    explanation,
    explanationPosition,
  } = props;
  const {
    handleOnAddItem,
    handleOnItemKeyDown,
    handleOnItemSelect,
    itemRefs,
    search,
    handleOnClose,
    open,
    handleOnClear,
    handleOnSearchChange,
    handleOnSearchKeyDown,
    handleToggleOpen,
    selectedValues,
    handleOnOpen,
    handleOnRemoveItem,
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

  if (mode === 'persistent' && 'value' in props && props.value) {
    throw new Error('You cannot use SingleSelect with persistent mode');
  }

  if (mode === 'persistent') {
    const persistentListContent =
      'groups' in props && props.groups ? (
        <GroupedSelectPersistent
          {...props}
          search={search}
          itemRefs={itemRefs}
          onItemSelect={handleOnItemSelect}
          onItemKeyDown={handleOnItemKeyDown}
          onSearchFilter={onSearchFilter}
          CustomMenuItemComponent={CustomMenuItemComponent}
        />
      ) : (
        <ListSelectPersistent
          {...props}
          search={search}
          itemRefs={itemRefs}
          onAddItem={props.onAddItem ? handleOnAddItem : undefined}
          onItemSelect={handleOnItemSelect}
          onItemKeyDown={handleOnItemKeyDown}
          onSearchFilter={onSearchFilter}
          CustomMenuItemComponent={CustomMenuItemComponent}
        />
      );

    return (
      <>
        {shouldShowLabel && (
          <Label
            label={
              <LabelWrapper>
                {label}
                {explanation && (
                  <InputExplanation position={explanationPosition}>
                    {explanation}
                  </InputExplanation>
                )}
              </LabelWrapper>
            }
            meta={meta}
            htmlFor={id}
            disabled={disabled}
          />
        )}
        <PersistentComboBoxWrapper
          $maxHeight={
            props.mode === 'persistent' && props.maxHeight
              ? props.maxHeight
              : undefined
          }
          $shouldShowLabel={shouldShowLabel}
        >
          <PersistentStickyWrapper>
            <SearchBar
              props={props}
              anchorRef={anchorRef}
              search={search}
              searchRef={searchRef}
              open={open}
              selectedValues={selectedValues}
              handleOnOpen={handleOnOpen}
              handleToggleOpen={handleToggleOpen}
              handleOnRemoveItem={handleOnRemoveItem}
              tryingToRemoveItem={tryingToRemoveItem}
              handleOnSearchChange={handleOnSearchChange}
              handleOnSearchKeyDown={handleOnSearchKeyDown}
              handleOnClear={handleOnClear}
            />
          </PersistentStickyWrapper>
          {props.loading ? (
            <>
              <SelectItemSkeleton />
              <SelectItemSkeleton />
              <SelectItemSkeleton />
            </>
          ) : (
            persistentListContent
          )}
        </PersistentComboBoxWrapper>
      </>
    );
  }

  return (
    <div>
      {shouldShowLabel && (
        <Label
          label={
            <LabelWrapper>
              {label}
              {explanation && (
                <InputExplanation position={explanationPosition}>
                  {explanation}
                </InputExplanation>
              )}
            </LabelWrapper>
          }
          meta={meta}
          htmlFor={id}
          disabled={disabled}
        />
      )}
      <SearchBar
        props={props}
        anchorRef={anchorRef}
        search={search}
        searchRef={searchRef}
        open={open}
        selectedValues={selectedValues}
        handleOnOpen={handleOnOpen}
        handleToggleOpen={handleToggleOpen}
        handleOnRemoveItem={handleOnRemoveItem}
        tryingToRemoveItem={tryingToRemoveItem}
        handleOnSearchChange={handleOnSearchChange}
        handleOnSearchKeyDown={handleOnSearchKeyDown}
        handleOnClear={handleOnClear}
      />
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
