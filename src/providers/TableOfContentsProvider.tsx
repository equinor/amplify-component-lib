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

import { useLocation, useNavigate } from '@tanstack/react-router';

import { useOnScreenMultiple } from 'src/atoms/hooks/useOnScreenMultiple';
import { getValues } from 'src/providers/TableOfContentsProvider.utils';

export interface TableOfContentsItemType {
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
  children?: TableOfContentsItemType[];
}

interface SetSelectedOptions {
  behavior?: ScrollBehavior | undefined;
  shouldInstantlyJumpOnMount?: boolean;
}

interface TableOfContentsContextType {
  items: TableOfContentsItemType[];
  selected: string | undefined;
  setSelected: (value: string, options?: SetSelectedOptions) => void;
  isActive: (item: TableOfContentsItemType) => boolean;
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
export const TableOfContentsProvider: FC<TableOfContentsProviderProps> = ({
  items,
  children,
  hashNavigation,
}) => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [selected, setSelected] = useState<string | undefined>(items[0]?.value);
  const [elements, setElements] = useState<(Element | null)[]>([]);
  const initHashStateRef = useRef(false);

  const values: string[] = useMemo(
    () => items.flatMap((item) => getValues([], item)),
    [items]
  );

  // Since useEffect runs on re-render we ensure that the elements array is updated
  useEffect(() => {
    setElements(values.map((value) => document.getElementById(value)));
  }, [values]);

  const isActive = useCallback(
    (item: TableOfContentsItemType) => {
      if (item.value === selected) return true;

      // In the 'border' variant we don't want parents to be set as active
      if (item.children && selected) {
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
    (value: string, options?: SetSelectedOptions) => {
      const selectedIndex = values.indexOf(value);
      const element = elements[selectedIndex];
      const behavior = options?.behavior ?? 'smooth';

      if (selectedIndex === -1 || !element) {
        console.warn(
          `TableOfContents: Unable to find element with value: ${value}`
        );
        return;
      }

      const newSelectedValue = values[selectedIndex];

      if (hashNavigation) {
        navigate({
          to: '.',
          hash: `#${newSelectedValue}`,
          hashScrollIntoView: false,
          replace: true,
          search: (prev: unknown) => prev,
        });
      }

      element.scrollIntoView({
        block: 'start',
        behavior,
      });

      isScrollingTo.current = selectedIndex;

      let previousTop = Infinity;
      let same = 0;
      /* v8 ignore start */
      const checkScrollDone = () => {
        const newTop = element?.getBoundingClientRect().top;
        if (newTop === previousTop) {
          same += 1;
          if (same > 1) {
            setSelected(newSelectedValue);
            isScrollingTo.current = -1;
            return;
          }
        } else {
          same = 0;
          previousTop = newTop;
        }
        requestAnimationFrame(checkScrollDone);
      };
      /* v8 ignore end */
      requestAnimationFrame(checkScrollDone);
    },
    [elements, hashNavigation, navigate, values]
  );

  useEffect(() => {
    if (!initHashStateRef.current && visible.length > 0) {
      initHashStateRef.current = true;

      const targetValue = decodeURIComponent(hash.replace('#', ''));
      if (!targetValue.length || !values.includes(targetValue)) {
        return;
      }

      handleSetSelected(targetValue);
    }
  }, [visible.length, handleSetSelected, hash, values]);

  // Handle change of selected when scrolling down the page
  /* v8 ignore start */
  useEffect(() => {
    if (
      visible.length === 0 ||
      visible.length !== values.length ||
      isScrollingTo.current !== -1 ||
      !initHashStateRef.current
    )
      return;

    let newSelectedIndex = -1;
    for (let index = visible.length - 1; index >= 0; index--) {
      if (visible[index]) {
        newSelectedIndex = index;
      }
    }

    if (newSelectedIndex === -1 || values.at(newSelectedIndex) === undefined)
      return;

    setSelected(values[newSelectedIndex]);
    if (hashNavigation) {
      navigate({
        to: '.',
        hash: `#${values[newSelectedIndex]}`,
        hashScrollIntoView: false,
        replace: true,
        search: (prev: unknown) => prev,
      });
    }
    // this effect handles scroll navigation and should not be triggered on hash change
  }, [handleSetSelected, hashNavigation, navigate, values, visible]);
  /* v8 ignore end */

  return (
    <TableOfContentsContext.Provider
      value={{
        items,
        selected,
        setSelected: handleSetSelected,
        isActive,
      }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
