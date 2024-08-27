import { act, FC, ReactNode } from 'react';

import { ThemeProvider, useThemeProvider } from './ThemeProvider';
import { THEME_LOCALSTORAGE_KEY } from './ThemeProvider.constants';
import { Theme } from 'src/atoms/enums/Theme';
import { renderHook } from 'src/tests/test-utils';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
      <div>text</div>
    </ThemeProvider>
  );
};

test('Sets data-theme as expected', () => {
  const { result } = renderHook(() => useThemeProvider(), {
    wrapper: Wrapper,
  });

  act(() => result.current.setTheme(Theme.DARK));

  expect(document.documentElement).toHaveAttribute('data-theme', Theme.DARK);
});

test('Initializes correctly', () => {
  window.localStorage.setItem(
    THEME_LOCALSTORAGE_KEY,
    JSON.stringify(Theme.DARK)
  );
  renderHook(() => useThemeProvider(), {
    wrapper: Wrapper,
  });

  expect(document.documentElement).toHaveAttribute('data-theme', Theme.DARK);
});

test("'useThemeProvider' hook throws error when used outside provider", () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useThemeProvider())).toThrowError();
});
