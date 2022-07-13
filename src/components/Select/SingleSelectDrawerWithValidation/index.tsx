import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import SelectLabel from '../SelectLabel';
import SingleSelectDrawer from '../SingleSelectDrawer';
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

export interface SingleSelectDrawerWithValidationProps<
  T extends { id: string; label: string }
> {
  items: T[];
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  onChange: (values: T | undefined) => void;
  initialItem: T | undefined;
  id: string;
}

const SingleSelectDrawerWithValidation = <
  T extends { id: string; label: string }
>({
  label,
  items,
  initialItem,
  rules,
  placeholder,
  onChange,
  id,
}: SingleSelectDrawerWithValidationProps<T>) => {
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
        defaultValue={initialItem}
        render={({ field: { onChange: onControllerChange } }) => (
          <SingleSelectDrawer<T>
            style={{ width: '100%' }}
            label=""
            id={id}
            onChange={(items) => {
              onControllerChange(items);
              onChange(items);
            }}
            initialItem={initialItem}
            items={items}
            placeholder={placeholder}
          />
        )}
      />
      <ErrorMessage message="This field is required" error={hasError} />
    </SelectLabel>
  );
};

export default SingleSelectDrawerWithValidation;
