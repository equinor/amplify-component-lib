import { ChangeEvent, useEffect, useState } from 'react';

import {
  Checkbox,
  CheckboxProps,
  Density,
  EdsProvider,
} from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import page from './Checkbox.docs.mdx';
import { Stack } from 'src/storybook';

import styled from 'styled-components';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Selection Controls/Checkbox',
  component: Checkbox,
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

const UnstyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const Introduction: StoryFn<CheckboxProps> = (args) => {
  return <Checkbox label="Play with me" {...args} />;
};

export const SingleCheckbox: StoryFn<CheckboxProps> = () => {
  // Use this to set the input to indeterminate = true as this must be done via JavaScript
  // (cannot use an HTML attribute for this)
  // State for controlled example
  const [checked, updateChecked] = useState(false);
  return (
    <UnstyledList>
      <li>
        <Checkbox label="Check me" />
      </li>
      <li>
        <Checkbox label="You can't check me!" disabled />
      </li>
      <li>
        <Checkbox label="I'm preselected" defaultChecked />
      </li>
      <li>
        <Checkbox label="You can't uncheck me!" disabled defaultChecked />
      </li>
      <li>
        <Checkbox label="I'm in indeterminate state" indeterminate />
      </li>
      <li>
        <Checkbox
          label="I'm a controlled component"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateChecked(e.target.checked);
          }}
          checked={checked}
        />
      </li>
    </UnstyledList>
  );
};
SingleCheckbox.storyName = 'Single checkbox';

export const GroupedCheckbox: StoryFn<CheckboxProps> = () => {
  return (
    <fieldset>
      <legend>
        We are in this together!
        <span role="img" aria-label="raising hands emoji">
          🙌
        </span>
      </legend>
      <UnstyledList>
        <li>
          <Checkbox label="Check me first" name="multiple" value="first" />
        </li>
        <li>
          <Checkbox label="Check me second" name="multiple" value="second" />
        </li>
        <li>
          <Checkbox label="Check me third" name="multiple" value="third" />
        </li>
      </UnstyledList>
    </fieldset>
  );
};
GroupedCheckbox.storyName = 'Grouped checkboxes';

export const Compact: StoryFn<CheckboxProps> = () => {
  const [density, setDensity] = useState<Density>('comfortable');

  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);

  return (
    <EdsProvider density={density}>
      <Checkbox label="I am compact" />
    </EdsProvider>
  );
};

export const AlternativeToLabel: StoryFn<CheckboxProps> = () => (
  <Checkbox aria-label="This label is invisible, but read by screen-readers" />
);
AlternativeToLabel.storyName = 'Alternative to label';
