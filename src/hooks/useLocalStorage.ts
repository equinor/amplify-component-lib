import { useCallback, useState } from 'react';

import { debounce } from 'lodash';

const LAST_UPDATED_KEY_SUFFIX = '-last-updated';

export const getLocalStorage = <T>(
  key: string,
  defaultState: T,
  keepAlive?: number
): T => {
  const localStorageData = localStorage.getItem(key);
  const localStorageLastEdited = localStorage.getItem(
    key + LAST_UPDATED_KEY_SUFFIX
  );

  if (
    localStorageData &&
    (!keepAlive ||
      (localStorageLastEdited &&
        Number(localStorageLastEdited) + keepAlive > new Date().getTime()))
  ) {
    return JSON.parse(localStorageData);
  }

  return defaultState;
};

export const updateLocalStorage = <T>(key: string, state: T) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const useLocalStorage = <T>(
  key: string,
  defaultState: T,
  keepAlive?: number
) => {
  const [state, setState] = useState<T>(
    getLocalStorage<T>(key, defaultState, keepAlive)
  );

  const debouncedUpdateLocalStorage = useCallback((key: string, state: T) => {
    return debounce(() => {
      updateLocalStorage(key, state);
      updateLocalStorage(key + LAST_UPDATED_KEY_SUFFIX, new Date().getTime());
    }, 1000);
  }, []);

  const handleSetState = (state: T) => {
    setState(state);
    if (state !== undefined) {
      const test = debouncedUpdateLocalStorage(key, state);
      test();
    }
  };

  return [state, handleSetState] as const;
};
