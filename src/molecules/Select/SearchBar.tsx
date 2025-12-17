import { useMemo, useRef } from 'react';

import { Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, clear } from '@equinor/eds-icons';

import { colors, getVariantIcon } from 'src/atoms';
import {
  ComboBoxChip,
  Icon,
  SelectOption,
  SelectOptionRequired,
} from 'src/molecules';
import { SelectComponentProps } from 'src/molecules/Select/Select';
import {
  ClearButton,
  Container,
  HelperWrapper,
  PlaceholderText,
  Section,
  ValueText,
  Wrapper,
} from 'src/molecules/Select/Select.styles';
import { SkeletonField } from 'src/molecules/Skeleton/SkeletonField';

interface SearchBarProps<T extends SelectOptionRequired> {
  props: SelectComponentProps<T>;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  handleOnClear: () => void;
  handleOnSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleToggleOpen: () => void;
  search: string;
  selectedValues: T[];
  handleOnOpen: () => void;
  handleOnRemoveItem: (item: SelectOption<T>) => void;
  open: boolean;
  searchRef: React.RefObject<HTMLInputElement | null>;
  tryingToRemoveItem: T | undefined;
}

export const SearchBar = <T extends SelectOptionRequired>({
  props,
  anchorRef,
  handleOnClear,
  handleOnSearchChange,
  handleOnSearchKeyDown,
  handleToggleOpen,
  search,
  selectedValues,
  handleOnOpen,
  handleOnRemoveItem,
  open,
  searchRef,
  tryingToRemoveItem,
}: SearchBarProps<T>) => {
  const {
    clearable = true,
    loading = false,
    disabled = false,
    lightBackground = false,
    placeholder = 'Select...',
    label,
    helperText,
    showHelperIcon = true,
    id = `amplify-combobox-${label}`,
    variant,
    'data-testid': dataTestId,
    mode = 'menu',
  } = props;

  const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);
  const shouldShowHelper = useMemo(() => {
    return !!helperText;
  }, [helperText]);
  const helperIcon = useMemo(() => {
    if (!showHelperIcon) return;

    return getVariantIcon(variant);
  }, [showHelperIcon, variant]);

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
    <Wrapper $showBackgroundColor={mode === 'persistent'}>
      <Container
        data-testid={dataTestId ? dataTestId : 'combobox-container'}
        ref={anchorRef}
        onClick={handleOnOpen}
        aria-expanded={open}
        aria-disabled={disabled || loading}
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
        {mode === 'menu' && (
          <Icon
            onClick={handleToggleOpen}
            data={open ? arrow_drop_up : arrow_drop_down}
            color={
              loading
                ? colors.interactive.disabled__fill.rgba
                : colors.interactive.primary__resting.rgba
            }
          />
        )}
        {clearable && selectedValues.length > 0 && !loading && !disabled && (
          <ClearButton
            id="clear"
            variant="ghost_icon"
            onClick={handleOnClear}
            data-testid="clearBtn"
            $rightPadding={mode === 'menu'}
          >
            <Icon data={clear} size={18} />
          </ClearButton>
        )}
      </Container>
      {shouldShowHelper && (
        <HelperWrapper
          $borderBottom={mode === 'persistent'}
          $variant={disabled ? 'disabled' : variant}
        >
          {helperIcon && <Icon data={helperIcon} size={16} />}
          <Label label={helperText} htmlFor={id} />
        </HelperWrapper>
      )}
    </Wrapper>
  );
};
