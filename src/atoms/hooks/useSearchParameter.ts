import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearchParameter<T>({
  key,
  initialValue,
  parser,
}: {
  key: string;
  initialValue?: T;
  parser?: (value: string) => T;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const usedInitialValue = useRef(false);

  const stringValue = searchParams.get(key) ?? undefined;
  const parsedValue = (
    parser && stringValue ? parser(stringValue) : stringValue
  ) as T | undefined;

  const value =
    !usedInitialValue.current && parsedValue === undefined
      ? initialValue
      : parsedValue;

  const handleSetValue = (action: ((value: T | undefined) => T) | T) => {
    if (!usedInitialValue.current) {
      usedInitialValue.current = true;
    }

    if (action instanceof Function) {
      // Called with previous value
      const newValue = action(value);
      handleSetValue(newValue);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      // Called with new value
      const stringify =
        typeof action === 'string' ? action : JSON.stringify(action);
      if (
        stringify === undefined ||
        stringify === '' ||
        stringify === 'null' ||
        stringify === '[]' ||
        stringify === '{}'
      ) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, stringify);
      }
      setSearchParams(newSearchParams);
    }
  };

  return [value, handleSetValue] as const;
}
