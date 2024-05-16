import { useCallback, useEffect, useRef, useState } from 'react';

import { debounce } from 'lodash';

export const LAST_UPDATED_KEY_SUFFIX = '-last-updated';

export const getLocalStorage = <T>(
  key: string,
  defaultState: T,
  keepAliveMs?: number
): T => {
  const localStorageData = localStorage.getItem(key);
  const localStorageLastEdited = localStorage.getItem(
    key + LAST_UPDATED_KEY_SUFFIX
  );

  if (
    localStorageData &&
    (!keepAliveMs ||
      (localStorageLastEdited &&
        Number(localStorageLastEdited) + keepAliveMs > new Date().getTime()))
  ) {
    return JSON.parse(localStorageData) as T;
  }

  return defaultState;
};

export const updateLocalStorage = <T>(key: string, state: T) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const useLocalStorage = <T>(
  key: string,
  defaultState: T,
  keepAliveMs?: number
) => {
  const initRender = useRef(true);

  const [state, setState] = useState<T>(
    getLocalStorage<T>(key, defaultState, keepAliveMs)
  );

  const clear = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(key);
    localStorage.removeItem(key + LAST_UPDATED_KEY_SUFFIX);
  }, [setState, defaultState, key]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateLocalStorage = useCallback(
    debounce((key: string, state: T) => {
      updateLocalStorage(key, state);
      updateLocalStorage(key + LAST_UPDATED_KEY_SUFFIX, new Date().getTime());
    }, 1000),
    []
  );

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    if (state === undefined || state === null) {
      clear();
    } else {
      debouncedUpdateLocalStorage(key, state);
    }
  }, [state, clear, debouncedUpdateLocalStorage, key]);

  return [state, setState, clear] as const;
};
