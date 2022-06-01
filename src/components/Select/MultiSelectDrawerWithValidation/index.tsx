import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

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
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  items: SelectItem<T>[];
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  selectedValues: string[];
  id: string;
}

const MultiSelectDrawerWithValidation = <T,>({
  label,
  items,
  selectedValues,
  rules,
  placeholder,
  id,
  setSelectedItems,
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
          items.filter((item) => selectedValues.includes(item.id)) ?? ['']
        }
        render={({ field: { onChange } }) => (
          <MultiSelectDrawer<T>
            style={{ width: '100%' }}
            label=""
            id={id}
            setSelectedItems={setSelectedItems}
            onChange={(items) => onChange(items)}
            selectedItems={selectedValues}
            items={items}
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
