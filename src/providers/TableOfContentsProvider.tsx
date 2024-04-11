import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

import { TableOfContentsVariants } from 'src/components/Navigation/TableOfContents/TableOfContents.types';
import { useOnScreenMultiple } from 'src/hooks/useOnScreen';
import { getValues } from 'src/providers/TableOfContentsProvider.utils';

export interface TableOfContentsItemType {
  label: string;
  value: string;
  disabled?: boolean;
  children?: TableOfContentsItemType[];
}

interface TableOfContentsContextType {
  items: TableOfContentsItemType[];
  selected: string | undefined;
  setSelected: (value: string) => void;
  isActive: (
    item: TableOfContentsItemType,
    variant: TableOfContentsVariants
  ) => boolean;
}

const TableOfContentsContext = createContext<
  TableOfContentsContextType | undefined
>(undefined);

export function useTableOfContents() {
  const context = useContext(TableOfContentsContext);
  if (context === undefined) {
    throw new Error("'useTableOfContents' must be used within provider");
  }
  return context;
}

export interface TableOfContentsProviderProps {
  items: TableOfContentsItemType[];
  children: ReactNode;
  hashNavigation?: boolean;
}

const TableOfContentsProvider: FC<TableOfContentsProviderProps> = ({
  items,
  children,
  hashNavigation,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | undefined>(items[0]?.value);
  const [elements, setElements] = useState<(Element | null)[]>([]);

  const values: string[] = useMemo(
    () => items.flatMap((item) => getValues([], item)),
    [items]
  );

  // Since useEffect runs on re-render we ensure that the elements array is updated
  useEffect(() => {
    setElements(values.map((value) => document.getElementById(value)));
  }, [values]);

  const isActive = useCallback(
    (item: TableOfContentsItemType, variant: TableOfContentsVariants) => {
      if (item.value === selected) return true;

      // In the 'border' variant we don't want parents to be set as active
      if (item.children && selected && variant === 'buttons') {
        const childValues = getValues([], item);
        return childValues.includes(selected);
      }
      return false;
    },
    [selected]
  );

  const visible = useOnScreenMultiple(elements);

  const isScrollingTo = useRef<number>(-1);

  // If the user clicks on an item in the TableOfContents that isn't visible now, we want to scroll to it
  const handleSetSelected = useCallback(
    (value: string) => {
      const selectedIndex = values.findIndex(
        (itemValue) => itemValue === value
      );
      const element = elements[selectedIndex];

      if (element) {
        element.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
        isScrollingTo.current = selectedIndex;
        let previousTop = Infinity;
        let same = 0;
        /* c8 ignore start */
        const checkScrollDone = () => {
          const newTop = element?.getBoundingClientRect().top;
          if (newTop === previousTop) {
            same += 1;
            if (same > 1) {
              setSelected(values[selectedIndex]);
              if (hashNavigation) {
                navigate(`#${values[selectedIndex]}`);
              }
              isScrollingTo.current = -1;
              return;
            }
          } else {
            same = 0;
            previousTop = newTop;
          }
          requestAnimationFrame(checkScrollDone);
        };
        /* c8 ignore end */
        requestAnimationFrame(checkScrollDone);
      }
    },
    [elements, hashNavigation, navigate, values]
  );

  // Handle change of selected when scrolling down the page
  /* c8 ignore start */
  useEffect(() => {
    if (
      visible.length === 0 ||
      visible.length !== values.length ||
      isScrollingTo.current !== -1
    )
      return;

    let newSelectedIndex = -1;
    for (let index = visible.length - 1; index >= 0; index--) {
      if (visible[index]) {
        newSelectedIndex = index;
      }
    }
    if (newSelectedIndex !== -1 && values.at(newSelectedIndex) !== undefined) {
      setSelected(values[newSelectedIndex]);
      if (hashNavigation) {
        navigate(`#${values[newSelectedIndex]}`);
      }
    }
  }, [hashNavigation, navigate, values, visible]);
  /* c8 ignore end */

  return (
    <TableOfContentsContext.Provider
      value={{ items, selected, setSelected: handleSetSelected, isActive }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};

export default TableOfContentsProvider;
