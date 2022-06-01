import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

import { SelectItem } from '..';
import SelectLabel from '../SelectLabel';
import SingleSelectDrawer from '../SingleSelectDrawer';

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

export interface SingleSelectDrawerWithValidationProps<T> {
  setSelectedItem: Dispatch<SetStateAction<string | undefined>>;
  items: SelectItem<T>[];
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  selectedValue: string | undefined;
  id: string;
}

const SingleSelectDrawerWithValidation = <T,>({
  label,
  items,
  selectedValue,
  rules,
  placeholder,
  id,
  setSelectedItem,
}: SingleSelectDrawerWithValidationProps<T>) => {
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
          items.filter((item) => selectedValue?.includes(item.id)) ?? ['']
        }
        render={({ field: { onChange } }) => (
          <SingleSelectDrawer<T>
            style={{ width: '100%' }}
            label=""
            id={id}
            setSelectedItem={setSelectedItem}
            onChange={(items) => onChange(items)}
            selectedItem={selectedValue}
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

export default SingleSelectDrawerWithValidation;
