import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useOnScreenMultiple } from '../hooks';

export type PageMenuItemType = {
  label: string;
  value: string;
};

interface PageMenuContextType {
  items: PageMenuItemType[];
  selected: string;
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
  if (items.length === 0) {
    throw new Error('items must have length greater than 0');
  }

  const [selected, setSelected] = useState<string>(items[0].value);
  const [elements, setElements] = useState<(Element | null)[]>([]);

  // Since useEffect runs on re-render we ensure that the elements array is updated
  useEffect(() => {
    setElements(items.map((item) => document.querySelector(`#${item.value}`)));
  }, [items]);

  const visible = useOnScreenMultiple(elements);
  const scrollingToIndex = useRef<number>(-1);

  // If the user clicks on an item in the PageMenu that isn't visible now, we want to scroll to it
  const handleSetSelected = (value: string) => {
    const selectedIndex = items.findIndex((item) => item.value === value);
    const element = elements[selectedIndex];
    if (!visible[selectedIndex] && element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      scrollingToIndex.current = selectedIndex;
    }
    setSelected(value);
  };

  // Handle change of selected when scrolling down the page
  useEffect(() => {
    if (
      visible.length === 0 ||
      (scrollingToIndex.current !== -1 && !visible[scrollingToIndex.current])
    )
      return;

    let newSelectedIndex = -1;
    for (let index = 0; index < visible.length; index++) {
      if (visible[index]) {
        newSelectedIndex = index;
      }
    }
    if (newSelectedIndex !== -1) {
      setSelected(items[newSelectedIndex].value);
    }
  }, [items, visible]);

  return (
    <PageMenuContext.Provider
      value={{ items, selected, setSelected: handleSetSelected }}
    >
      {children}
    </PageMenuContext.Provider>
  );
};

export default PageMenuProvider;
