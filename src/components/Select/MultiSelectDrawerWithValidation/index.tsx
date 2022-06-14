import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import MultiSelectDrawer from '../MultiSelectDrawer';
import { SelectItem } from '..';
import SelectLabel from '../SelectLabel';

const ErrorMessage = ({
  message,
  error,
}: {
  message: string;
  error: boolean;
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

export interface MultiSelectDrawerWithValidationProps<T> {
  items: SelectItem<T>[];
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  onChange: (values: SelectItem<T>[]) => void;
  initialItems: string[];
  id: string;
}

const MultiSelectDrawerWithValidation = <T,>({
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

  return (
    <SelectLabel id={id} label={label} required={rules?.required !== undefined}>
      <Controller
        control={control}
        name={label}
        rules={rules}
        defaultValue={
          items.filter((item) => initialItems.find((s) => s === item.id)) ?? [
            '',
          ]
        }
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
      <ErrorMessage
        message="This field is required"
        error={errors[label] && errors[label].type === 'required'}
      />
    </SelectLabel>
  );
};

export default MultiSelectDrawerWithValidation;
