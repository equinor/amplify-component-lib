import { useEffect, useState } from 'react';

const getLocalStorage = <T>(key: string, defaultState: T): T => {
  const localStorageData = localStorage.getItem(key);

  if (localStorageData) {
    return JSON.parse(localStorageData);
  }

  return defaultState;
};

export const updateLocalStorage = <T>(key: string, state: T) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const useLocalStorage = <T>(key: string, defaultState: T) => {
  const [state, setState] = useState<T>(getLocalStorage<T>(key, defaultState));

  useEffect(() => {
    if (state !== undefined) {
      updateLocalStorage(key, state);
    }
  }, [key, state]);

  return [state, setState] as const;
};
