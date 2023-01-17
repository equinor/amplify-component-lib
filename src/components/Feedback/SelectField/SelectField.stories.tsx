import { useEffect, useRef, useState } from 'react';

import { Meta, Story } from '@storybook/react';

import { Field } from '../../../types/Field';
import SelectField from './SelectField';

import { v4 as uuidv4 } from 'uuid';

const equinorFields = [
  'Gina Krog',
  'Grane',
  'Gullfaks',
  'Heidrun',
  'Johan Sverdrup',
  'Martin Linge',
  'Aasta Hansteeen',
  'Åsgard',
];

export default {
  title: 'Feedback/SelectField',
  component: SelectField,
} as Meta;

function generateFakeFields(): Field[] {
  const fields: Field[] = [];
  for (let i = 0; i < Math.random() * (equinorFields.length - 1 - 2) + 5; i++) {
    fields.push({
      name: equinorFields[i],
      uuid: uuidv4(),
      country: 'Norway',
    });
  }
  return fields;
}

const getMyFields = (): Promise<Field[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFakeFields());
    }, 1000);
  });
};

export const Template: Story = () => {
  const field = useRef<Field | undefined>(undefined);
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setField = (value: Field) => {
    field.current = value;
  };

  const onChangedField = () => {
    console.log('Changed to field: ', field.current);
    field.current = undefined;
  };

  useEffect(() => {
    const getFields = async () => {
      const fetched = await getMyFields();
      setFields(fetched);
      setIsLoading(false);
    };
    getFields();
  }, []);

  return (
    <SelectField
      photo="./field-selector.png"
      setField={setField}
      fields={fields}
      isLoading={isLoading}
      onChangedField={onChangedField}
      finishedText="Taking you to the storybook"
    />
  );
};
