import { ChangeEvent, useEffect, useState } from 'react';

import {
  Density,
  EdsProvider,
  Switch,
  SwitchProps,
} from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import page from 'src/molecules/Switch/Switch.docs.mdx';
import { Stack } from 'src/storybook';

import styled from 'styled-components';

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const meta: Meta<typeof Switch> = {
  title: 'Organisms/Selection Controls/Switch',
  component: Switch,
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack>
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

export const Introduction: StoryFn<SwitchProps> = (args) => {
  return <Switch label="Play with me" {...args} />;
};

export const DefaultStates: StoryFn<SwitchProps> = () => {
  const [check, setCheck] = useState(false);

  return (
    <UnstyledList>
      <li>
        <Switch label="I'm default off" />
      </li>
      <li>
        <Switch label="I'm default on" defaultChecked />
      </li>
      <li>
        <Switch disabled label="You can't turn me on!" />
      </li>
      <li>
        <Switch disabled defaultChecked label="You can't turn me off!" />
      </li>
      <li>
        <Switch
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheck(e.target.checked);
          }}
          checked={check}
          label={`Slider is ${check ? 'checked' : 'unchecked'}`}
        />
      </li>
    </UnstyledList>
  );
};
DefaultStates.storyName = 'Default states';

export const AlternativeToLabel: StoryFn<SwitchProps> = () => (
  <Switch aria-label="This label is invisible, but read by screen-readers" />
);
AlternativeToLabel.storyName = 'Alternative to label';

export const Compact: StoryFn<SwitchProps> = () => {
  const [density, setDensity] = useState<Density>('comfortable');

  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);

  return (
    <EdsProvider density={density}>
      <UnstyledList>
        <li>
          <Switch label="I'm default off" size="small" />
        </li>
        <li>
          <Switch label="I'm default on" defaultChecked size="small" />
        </li>
        <li>
          <Switch disabled label="You can't turn me on!" size="small" />
        </li>
        <li>
          <Switch
            disabled
            defaultChecked
            label="You can't turn me off!"
            size="small"
          />
        </li>
      </UnstyledList>
    </EdsProvider>
  );
};
