import { createContext, FC, ReactNode, useContext } from 'react';

import { Field } from 'src/atoms/types/Field';

interface TopBarInternalContextType {
  selectedField?: Field;
}

const TopBarInternalContext = createContext<
  TopBarInternalContextType | undefined
>(undefined);

export function useTopBarInternalContext() {
  const ctx = useContext(TopBarInternalContext);
  if (!ctx) {
    throw new Error(
      'useTopBarInternalContext must be used within TopBarInternalContextProvider'
    );
  }

  return ctx;
}

interface TopBarInternalContextProviderProps {
  selectedField?: Field;
  children: ReactNode;
}

export const TopBarInternalContextProvider: FC<
  TopBarInternalContextProviderProps
> = ({ selectedField, children }) => {
  return (
    <TopBarInternalContext.Provider value={{ selectedField }}>
      {children}
    </TopBarInternalContext.Provider>
  );
};
