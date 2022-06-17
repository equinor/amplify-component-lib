import { FC, ReactNode, createContext, useReducer, useContext } from 'react';

const localStorageKey = 'sidebarstatecontext';
type Dispatch<State> = (newState: State) => void;

type State = {
  isOpen: boolean;
};

export type ContextState = {
  isOpen: boolean;
  dispatch: Dispatch<State>;
};

const getDefaultState = (): State => {
  const localStorageData = localStorage.getItem(localStorageKey);

  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return { isOpen: false };
};

const updateLocalStorage = (state: State) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const SidebarContext = createContext<ContextState | undefined>(
  undefined
);

const sidebarStateReducer = (state: State, newState: State) => {
  updateLocalStorage(newState);
  return newState;
};

export const useSideBarState = (): ContextState => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(
      'useDartSideBarState must be used within a DartSideBarStateProvider'
    );
  }
  return context;
};

const SideBarStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarStateReducer, getDefaultState());

  return (
    <SidebarContext.Provider value={{ isOpen: state.isOpen, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SideBarStateProvider;
