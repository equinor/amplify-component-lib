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

import { getValues } from './PageMenuProvider.utils';
import { PageMenuVariants } from 'src/components/Navigation/PageMenu/PageMenu.types';
import { useOnScreenMultiple } from 'src/hooks/useOnScreen';

export interface PageMenuItemType {
  label: string;
  value: string;
  disabled?: boolean;
  children?: PageMenuItemType[];
}

interface PageMenuContextType {
  items: PageMenuItemType[];
  selected: string | undefined;
  setSelected: (value: string) => void;
  isActive: (item: PageMenuItemType, variant: PageMenuVariants) => boolean;
}

const PageMenuContext = createContext<PageMenuContextType | undefined>(
  undefined
);

export function usePageMenu() {
  const context = useContext(PageMenuContext);
  if (context === undefined) {
    throw new Error("'usePageMenu' must be used within provider");
  }
  return context;
}

export interface PageMenuProviderProps {
  items: PageMenuItemType[];
  children: ReactNode;
}

const PageMenuProvider: FC<PageMenuProviderProps> = ({ items, children }) => {
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
    (item: PageMenuItemType, variant: PageMenuVariants) => {
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

  // If the user clicks on an item in the PageMenu that isn't visible now, we want to scroll to it
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
    [elements, values]
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
    }
  }, [values, visible]);
  /* c8 ignore end */

  return (
    <PageMenuContext.Provider
      value={{ items, selected, setSelected: handleSetSelected, isActive }}
    >
      {children}
    </PageMenuContext.Provider>
  );
};

export default PageMenuProvider;
