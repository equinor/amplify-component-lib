import {
  createContext,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useOnScreenMultiple } from 'src/hooks/useOnScreen';

export type PageMenuItemType = {
  label: string;
  value: string;
};

interface PageMenuContextType {
  items: PageMenuItemType[];
  selected: string | undefined;
  setSelected: (value: string) => void;
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

interface PageMenuProviderProps {
  items: PageMenuItemType[];
  children: ReactElement;
}

const PageMenuProvider: FC<PageMenuProviderProps> = ({ items, children }) => {
  const [selected, setSelected] = useState<string | undefined>(items[0]?.value);
  const [elements, setElements] = useState<(Element | null)[]>([]);

  // Since useEffect runs on re-render we ensure that the elements array is updated
  useEffect(() => {
    setElements(items.map((item) => document.querySelector(`#${item.value}`)));
  }, [items]);

  const visible = useOnScreenMultiple(elements);
  const isScrollingTo = useRef<number>(-1);

  // If the user clicks on an item in the PageMenu that isn't visible now, we want to scroll to it
  const handleSetSelected = useCallback((value: string) => {
    const selectedIndex = items.findIndex((item) => item.value === value);
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
            setSelected(items[selectedIndex].value);
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
  }, [elements, items]);

  // Handle change of selected when scrolling down the page
  /* c8 ignore start */
  useEffect(() => {
    if (
      visible.length === 0 ||
      visible.length !== items.length ||
      isScrollingTo.current !== -1
    )
      return;

    let newSelectedIndex = -1;
    for (let index = 0; index < visible.length; index++) {
      if (visible[index]) {
        newSelectedIndex = index;
      }
    }
    if (newSelectedIndex !== -1 && items.at(newSelectedIndex) !== undefined) {
      setSelected(items[newSelectedIndex].value);
    }
  }, [items, visible]);
  /* c8 ignore end */

  return (
    <PageMenuContext.Provider
      value={{ items,  selected, setSelected: handleSetSelected }}
    >
      {children}
    </PageMenuContext.Provider>
  );
};

export default PageMenuProvider;

