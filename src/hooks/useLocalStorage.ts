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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateLocalStorage = useCallback(
    debounce((key: string, state: T) => {
      updateLocalStorage(key, state);
      updateLocalStorage(key + LAST_UPDATED_KEY_SUFFIX, new Date().getTime());
    }, 1000),
    []
  );

  const handleSetState = (state: T) => {
    setState(state);
    if (state === undefined) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + LAST_UPDATED_KEY_SUFFIX);
    } else {
      debouncedUpdateLocalStorage(key, state);
    }
  };

  return [state, handleSetState] as const;
};
