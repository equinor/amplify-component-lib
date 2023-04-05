import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useOnScreenMultiple, usePrevious } from '../hooks';

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

  const elements = useMemo((): (Element | null)[] => {
    const all: (Element | null)[] = [];
    for (const item of items) {
      const element = document.querySelector(`#${item.value}`);
      all.push(element);
    }
    return all;
  }, [items]);

  const visible = useOnScreenMultiple(elements);
  const prevVisible = usePrevious(visible);

  // If the user clicks on an item in the PageMenu that isn't visible now, we want to scroll to it
  const handleSetSelected = (value: string) => {
    const selectedIndex = items.findIndex((item) => item.value === value);

    if (!visible[selectedIndex] && elements[selectedIndex] !== null) {
      elements[selectedIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle change of selected when scrolling down the page
  useEffect(() => {
    if (prevVisible === undefined) return;

    let newSelectedIndex = -1;
    for (let index = 0; index < visible.length; index++) {
      if (prevVisible[index] !== visible[index]) {
        newSelectedIndex = index;
      }
    }

    if (newSelectedIndex !== -1) {
      setSelected(items[newSelectedIndex].value);
    }
  }, [items, prevVisible, visible]);

  return (
    <PageMenuContext.Provider
      value={{ items, selected, setSelected: handleSetSelected }}
    >
      {children}
    </PageMenuContext.Provider>
  );
};

export default PageMenuProvider;
