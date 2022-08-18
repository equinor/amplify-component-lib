import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import MultiSelectDrawer from './MultiSelectDrawer';
import SelectLabel from './SelectLabel';
import { useMemo } from 'react';

const ErrorMessage = ({
  message,
  error,
}: {
  message: string;
  error?: boolean;
}) => {
  return (
    <span
      role="alert"
      id="error-county-required"
      style={{
        color: 'red',
        fontSize: '0.75rem',
        display: error ? 'block' : 'none',
      }}
    >
      {message}
    </span>
  );
};

export interface MultiSelectDrawerWithValidationProps<
  T extends { id: string; label: string; children?: T[] }
> {
  items: T[];
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  onChange: (values: T[]) => void;
  initialItems: T[];
  id: string;
}

const MultiSelectDrawerWithValidation = <
  T extends { id: string; label: string; children?: T[] }
>({
  label,
  items,
  rules,
  onChange,
  placeholder,
  id,
  initialItems,
}: MultiSelectDrawerWithValidationProps<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const hasError = useMemo((): boolean => {
    if (errors?.[label]?.type) {
      const errorType: string = errors?.[label]?.type as unknown as string;
      return errorType === 'required';
    }
    return false;
  }, [errors, label]);

  return (
    <SelectLabel id={id} label={label} required={rules?.required !== undefined}>
      <Controller
        control={control}
        name={label}
        rules={rules}
        defaultValue={initialItems}
        render={({ field: { onChange: onControllerChange } }) => (
          <MultiSelectDrawer<T>
            style={{ width: '100%' }}
            label=""
            id={id}
            onChange={(items) => {
              onControllerChange(items);
              onChange(items);
            }}
            items={items}
            initialItems={initialItems}
            placeholder={placeholder}
          />
        )}
      />
      <ErrorMessage message="This field is required" error={hasError} />
    </SelectLabel>
  );
};

export default MultiSelectDrawerWithValidation;
