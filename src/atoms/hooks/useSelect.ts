import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { SelectComponentProps } from 'src/molecules/Select/Select';
import { SelectOption } from 'src/molecules/Select/Select.types';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';

const useSelect = <T extends SelectOptionRequired>(
  props: SelectComponentProps<T>
) => {
  const { loading, disabled, sortValues, onSearchChange, onOpenCallback } =
    props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusingItemIndex = useRef<number>(-1);
  const [tryingToRemoveItem, setTryingToRemoveItem] = useState<T | undefined>(
    undefined
  );

  const internalUpdateOfValues = useRef<boolean>(false);
  const previousAmountOfValues = useRef<number>(0);

  const selectedValues: T[] = useMemo(() => {
    let selected: T[] = [];
    if ('values' in props) {
      selected = props.values;
    } else if (props.value) {
      selected = [props.value];
    }

    if (!sortValues) return selected;

    let flattenedItems: T[];
    if (props.groups) {
      flattenedItems = props.groups.flatMap((group) => group.items);
    } else {
      flattenedItems = props.items.flatMap((item) => [
        { ...item },
        ...(item.children! || []),
      ]);
    }

    return selected.sort((a, b) => {
      const firstIndex = flattenedItems.findIndex(
        (item) => item.value === a.value
      );
      const secondIndex = flattenedItems.findIndex(
        (item) => item.value === b.value
      );
      return firstIndex - secondIndex;
    });
  }, [props, sortValues]);

  useEffect(() => {
    if (onOpenCallback !== undefined) {
      onOpenCallback(open);
    }
  }, [onOpenCallback, open]);

  useEffect(() => {
    if (
      internalUpdateOfValues.current &&
      previousAmountOfValues.current !== selectedValues.length
    ) {
      previousAmountOfValues.current = selectedValues.length;
      internalUpdateOfValues.current = false;
      searchRef.current?.focus();
    }
  }, [selectedValues.length]);

  const handleOnOpen = () => {
    if (!open && !disabled && !loading) {
      searchRef.current?.focus();
      setOpen(true);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setSearch('');
    focusingItemIndex.current = 0;
  };

  const handleToggleOpen = () => {
    if (disabled || loading) return;

    if (open) {
      handleOnClose();
    } else {
      handleOnOpen();
    }
  };

  const handleOnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ' ' || loading || disabled) return;
    setSearch(event.target.value);
    onSearchChange?.(event.target.value);
    if (!open) {
      setOpen(true);
    }
  };

  const getNewValues = (
    current: SelectOption<T>[],
    item: SelectOption<T>
  ): SelectOption<T>[] => {
    // De-selecting
    const copy = structuredClone(current);
    if (copy.some((x) => x.value === item.value)) {
      return copy.filter((x) => x.value !== item.value);
    }
    // Check if child of any parent was selected
    return [
      item,
      ...copy.filter(
        (x) =>
          x.children === undefined ||
          x.children.length === 0 ||
          x.children.every((child) => child.value === item.value)
      ),
    ];
  };

  const handleOnItemSelect = (item: SelectOption<T>) => {
    if ('value' in props) {
      props.onSelect(item);
    } else {
      props.onSelect(getNewValues(props.values, item), item);
    }

    if (search !== '') {
      setSearch('');
    }
    internalUpdateOfValues.current = true;
  };

  const handleOnRemoveItem = (item: T) => {
    if ('values' in props && !loading && !disabled) {
      props.onSelect(
        props.values.filter((i) => i.value !== item.value),
        item
      );
    }
  };

  const handleOnClear = () => {
    if ('value' in props) props.onSelect(undefined);
    else {
      props.onSelect([]);
    }
  };

  const handleOnSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      search !== '' &&
      'onAddItem' in props &&
      props.onAddItem
    ) {
      props.onAddItem(search);
      setSearch('');
    } else if (event.key === 'Space' || event.key === 'Enter') {
      handleOnOpen();
    } else if (event.key === 'Escape') {
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
      'values' in props &&
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
    } else if (event.key === 'ArrowUp' && focusingItemIndex.current === 0) {
      focusingItemIndex.current = -1;
      searchRef.current?.focus();
    }
  };

  const handleOnMouseEnterItem = (index: number) => {
    focusingItemIndex.current = index;
    itemRefs.current.at(index)?.focus();
  };

  return {
    handleOnItemSelect,
    handleOnItemKeyDown,
    handleOnSearchKeyDown,
    handleOnClear,
    handleOnSearchChange,
    handleToggleOpen,
    handleOnClose,
    handleOnOpen,
    handleOnRemoveItem,
    handleOnMouseEnterItem,
    search,
    searchRef,
    itemRefs,
    selectedValues,
    open,
    tryingToRemoveItem,
  };
};

export { useSelect };
