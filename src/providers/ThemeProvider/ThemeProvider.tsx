import { createContext, FC, ReactNode, useContext, useEffect } from 'react';

import { THEME_LOCALSTORAGE_KEY } from './ThemeProvider.constants';
import { Theme } from 'src/atoms/enums/Theme';
import { useLocalStorage } from 'src/atoms/hooks/useLocalStorage';

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<
  ThemeProviderContextType | undefined
>(undefined);

export function useThemeProvider() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('ThemeProvider must be used within Provider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    THEME_LOCALSTORAGE_KEY,
    Theme.LIGHT
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleOnSetTheme = (value: Theme) => {
    setTheme(value);
  };

  return (
    <ThemeProviderContext.Provider
      value={{ theme, setTheme: handleOnSetTheme }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
};
