import { useEffect, useRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { Meta, Story } from '@storybook/react';

import { Field } from '../../../types/Field';
import ApplicationIcon from '../../Icons/ApplicationIcon/ApplicationIcon';
import TopBar from '../../Navigation/TopBar';
import Template from '../../Template/Template';
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
  argTypes: {
    finishedText: { control: 'text' },
    showAccessITLink: { control: 'boolean' },
  },
  args: {
    finishedText: 'Taking you to the storybook',
    showAccessITLink: true,
  },
} as Meta;

function generateFakeFields(): Field[] {
  const fields: Field[] = [];
  for (let i = 0; i < equinorFields.length - 1; i++) {
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

export const Primary: Story = (args) => {
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
    <Template>
      <TopBar
        onHeaderClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        applicationIcon={<ApplicationIcon name="acquire" size={40} />}
        applicationName="App"
      >
        <TopBar.Actions>
          <Button variant="ghost_icon">
            <Icon data={info_circle} />
          </Button>
        </TopBar.Actions>
      </TopBar>
      <Template.Container>
        <Template.Content open={false}>
          <SelectField
            showAccessITLink={args.showAccessITLink}
            setField={setField}
            fields={fields}
            isLoading={isLoading}
            onChangedField={onChangedField}
            finishedText={args.finishedText}
          />
        </Template.Content>
      </Template.Container>
    </Template>
  );
};
