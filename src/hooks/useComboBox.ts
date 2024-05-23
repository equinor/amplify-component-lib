import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ComboBoxOption } from 'src/components';
import {
  ComboBoxOptionRequired,
  ComboBoxProps,
  GroupedComboboxProps,
} from 'src/components/Inputs/ComboBox/ComboBox.types';
import { flattenOptions } from 'src/components/Inputs/ComboBox/ComboBox.utils';

import { groupBy } from 'lodash';

export type ComboBoxComponentProps<T extends ComboBoxOptionRequired> = {
  sortValues?: boolean;
  disabled?: boolean;
  loading?: boolean;
} & (ComboBoxProps<T> | GroupedComboboxProps<T>);

const useComboBox = <T extends ComboBoxOptionRequired>(
  props: ComboBoxComponentProps<T>
) => {
  const { loading = false, disabled = false, sortValues = true } = props;
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

  if ('groups' in props && 'items' in props) {
    throw new Error("Can't use both items and groups!");
  }

  const selectedValues: T[] = useMemo(() => {
    let selected: T[] = [];
    if ('values' in props) {
      selected = props.values;
    } else if (props.value) {
      selected = [props.value];
    }

    if (!sortValues) return selected;

    let flattenedItems: T[];
    if ('groups' in props) {
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
    if (!open) {
      setOpen(true);
    }
  };

  const items = 'items' in props ? props.items : [];

  const groupedFormations = groupBy(
    flattenOptions(items),
    ({ value }) => value
  );

  const getParent = (value: string) => {
    const parentName = groupedFormations[value]?.at(0)?.parent ?? '';
    return groupedFormations[parentName]?.at(0);
  };

  const getParentsRecursively = (value: string): ComboBoxOption<T>[] => {
    const parent = getParent(value);
    if (!parent?.children) return [];

    return [parent, ...getParentsRecursively(parent.value)];
  };

  const getValuesToAdd = (
    values: ComboBoxOption<T>[],
    item: ComboBoxOption<T>
  ): ComboBoxOption<T>[] => {
    const flatParents = getParentsRecursively(item.value).map(
      ({ value }) => value
    );

    const flatChildren = flattenOptions(item.children ?? []).map(
      ({ value }) => value
    );

    return [
      item,
      ...values.filter(
        ({ value }) => ![...flatChildren, ...flatParents].includes(value)
      ),
    ];
  };

  const handleOnItemSelect = (item: ComboBoxOption<T>) => {
    if ('value' in props) {
      props.onSelect(item);
    } else if (props.values.find((i) => i.value === item.value)) {
      // Remove item
      props.onSelect(
        props.values.filter((i) => i.value !== item.value),
        item
      );
    } else {
      //add item and uncheck potential relative checkboxes
      props.onSelect(getValuesToAdd(props.values, item), item);
    }

    if (search !== '') {
      setSearch('');
    }
    internalUpdateOfValues.current = true;
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

  const handleOnClear = () => {
    if ('value' in props) props.onSelect(undefined);
    else {
      props.onSelect([]);
    }
  };

  const handleOnSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Space' || event.key === 'Enter') {
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
    search,
    searchRef,
    itemRefs,
    selectedValues,
    open,
    tryingToRemoveItem,
  };
};

export { useComboBox };
