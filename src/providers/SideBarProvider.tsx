import { createContext, FC, ReactNode, useContext, useReducer } from 'react';

interface SideBarContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface SideBarState {
  isOpen: boolean;
}

export function useSideBar() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error('Sidebar hook must be used within Provider');
  }
  return context;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

const localStorageKey = 'amplify-sidebar-state';

const getDefaultState = (): SideBarState => {
  const localStorageData = localStorage.getItem(localStorageKey);

  if (localStorageData) {
    return JSON.parse(localStorageData) as SideBarState;
  }
  return {
    isOpen: false,
  };
};
const updateLocalStorage = (state: SideBarState) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const sidebarReducer = (state: SideBarState, newState: SideBarState) => {
  updateLocalStorage(newState);
  return newState;
};

const SideBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, getDefaultState());

  const setIsOpen = (value: boolean) => {
    dispatch({ isOpen: value });
  };

  return (
    <SideBarContext.Provider value={{ isOpen: state.isOpen, setIsOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
