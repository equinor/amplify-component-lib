import { useEffect, useRef, useState } from 'react';
import { MemoryRouter } from 'react-router';

import { Button, Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Template } from '../Template/Template';
import { FieldSelector } from './FieldSelector';
import { Field } from 'src/atoms/types/Field';
import { TopBar } from 'src/organisms/TopBar';

import { actions } from 'storybook/actions';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 1000%;
  min-width: 100%;
  > div {
    max-height: calc(100% - 64px);
    height: calc(100% - 64px);
    width: 100%;
  }
`;

const equinorFields = [
  'Gina Krog',
  'Grane',
  'Gullfaks',
  'Heidrun',
  'Johan Sverdrup',
  'Martin Linge',
  'Aasta Hansteeen',
  'Åsgard',
] as const;

const meta: Meta<typeof FieldSelector> = {
  title: 'Organisms/FieldSelector',
  component: FieldSelector,
  argTypes: {
    itemNameSingular: {
      control: 'text',
      description:
        'Defaults to "field" Singular of whatever it is you are selecting, if it is multiple things set it to "field or {whatever}"',
    },
    finishedText: { control: 'text' },
    showAccessITLink: { control: 'boolean' },
  },
  args: {
    finishedText: 'Taking you to the storybook',
    showAccessITLink: true,
    itemNameSingular: undefined,
  },
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

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

export const Primary: StoryFn = (args) => {
  const field = useRef<Field | undefined>(undefined);
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setField = (value: Field) => {
    field.current = value;
  };

  const onChangedField = () => {
    actions('onChangedField').onChangedField('Ran cnChange field');
    field.current = undefined;
  };

  useEffect(() => {
    const getFields = async () => {
      const fetched = await getMyFields();
      setFields(fetched);
      setIsLoading(false);
    };
    getFields().catch((error) => {
      console.error('Error fetching fields', error);
    });
  }, []);

  return (
    <MemoryRouter>
      <StoryContainer>
        <Template>
          <Template.GlobalStyles />
          <TopBar applicationIcon="acquire" applicationName="App">
            <TopBar.Actions>
              <Button variant="ghost_icon">
                <Icon data={info_circle} />
              </Button>
            </TopBar.Actions>
          </TopBar>
          <Template.Container>
            <Template.Content $open={false} id="content">
              <FieldSelector
                itemNameSingular={args.itemNameSingular as string}
                showAccessITLink={args.showAccessITLink as boolean}
                setField={setField}
                fields={fields}
                isLoading={isLoading}
                onChangedField={onChangedField}
                finishedText={args.finishedText as string}
              />
            </Template.Content>
          </Template.Container>
        </Template>
      </StoryContainer>
    </MemoryRouter>
  );
};
