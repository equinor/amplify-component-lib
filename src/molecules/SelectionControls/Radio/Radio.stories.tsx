import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { Radio } from 'src/molecules/SelectionControls/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Molecules/Selection Controls/Radio',
  component: Radio,
  argTypes: {
    onChange: { action: 'onChange' },
    error: {
      control: 'boolean',
      description: 'If true, the radio button will be in error state',
    },
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=2492-4489&m=dev',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Toyota',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Toyota',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Toyota',
    error: true,
  },
};

export const Outlined: Story = {
  args: {
    label: 'Toyota',
    outlined: true,
  },
};

export const DisabledOutlined: Story = {
  args: {
    label: 'Toyota',
    disabled: true,
    outlined: true,
  },
};

export const ErrorOutlined: Story = {
  args: {
    label: 'Toyota',
    outlined: true,
    error: true,
  },
};

// Test-only stories
export const TestRendersLabel: Story = {
  tags: ['test-only'],
  args: {
    label: 'Test Label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Test Label')).toBeInTheDocument();
  },
};

export const TestCheckedAttribute: Story = {
  tags: ['test-only'],
  args: {
    label: 'Test',
    checked: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio')).toBeChecked();
  },
};
